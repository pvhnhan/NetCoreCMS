using MediatR;
using CMS.Application.Modules.Authentication.DTOs.Requests;
using CMS.Application.Modules.Authentication.DTOs.Responses;
using CMS.Core.Interfaces;
using CMS.Common.Utilities;
using CMS.Common.Interfaces.Repositories;
using CMS.Core.Entities;
using CMS.Application.Modules.Authentication.Services;

namespace CMS.Application.Modules.Authentication.Handlers;

public class ChangePasswordHandler : IRequestHandler<ChangePasswordRequest, ChangePasswordResponse>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IEntityRepository<User> _userRepository;
    private readonly IJwtService _jwtService;
    private readonly PasswordHasher _passwordHasher;

    public ChangePasswordHandler(IUnitOfWork unitOfWork, IEntityRepository<User> userRepository, IJwtService jwtService)
    {
        _unitOfWork = unitOfWork;
        _userRepository = userRepository;
        _jwtService = jwtService;
        _passwordHasher = new PasswordHasher();
    }

    public async Task<ChangePasswordResponse> Handle(ChangePasswordRequest request, CancellationToken cancellationToken)
    {
        var userId = _jwtService.GetUserIdFromToken(request.AccessToken ?? "");
        if (userId == null)
        {
            return new ChangePasswordResponse { Success = false, Message = "Token không hợp lệ" };
        }
        
        var user = await _userRepository.FindAsync(u => u.Id == userId.Value && u.IsActive);
        if (user == null)
        {
            return new ChangePasswordResponse { Success = false, Message = "Không tìm thấy user" };
        }
        
        if (!_passwordHasher.VerifyPassword(request.OldPassword, user.PasswordHash))
        {
            return new ChangePasswordResponse { Success = false, Message = "Mật khẩu cũ không đúng" };
        }
        
        if (!_passwordHasher.IsPasswordStrong(request.NewPassword))
        {
            return new ChangePasswordResponse { Success = false, Message = "Mật khẩu mới không đủ mạnh" };
        }
        
        user.PasswordHash = _passwordHasher.HashPassword(request.NewPassword);
        _userRepository.Update(user);
        await _unitOfWork.SaveChangesAsync();
        
        return new ChangePasswordResponse { Success = true, Message = "Đổi mật khẩu thành công" };
    }
} 