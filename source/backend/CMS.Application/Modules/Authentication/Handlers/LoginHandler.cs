using MediatR;
using CMS.Application.Modules.Authentication.DTOs.Requests;
using CMS.Application.Modules.Authentication.DTOs.Responses;
using CMS.Core.Interfaces;
using CMS.Common.Utilities;
using Microsoft.EntityFrameworkCore;
using CMS.Application.Modules.Authentication.Services;

namespace CMS.Application.Modules.Authentication.Handlers;

public class LoginHandler : IRequestHandler<LoginRequest, LoginResponse>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IJwtService _jwtService;
    private readonly PasswordHasher _passwordHasher;

    public LoginHandler(IUnitOfWork unitOfWork, IJwtService jwtService)
    {
        _unitOfWork = unitOfWork;
        _jwtService = jwtService;
        _passwordHasher = new PasswordHasher();
    }

    public async Task<LoginResponse> Handle(LoginRequest request, CancellationToken cancellationToken)
    {
        var user = await _unitOfWork.Users.GetAll()
            .FirstOrDefaultAsync(u => u.Username == request.Username && u.IsActive, cancellationToken);
        if (user == null || !_passwordHasher.VerifyPassword(request.Password, user.PasswordHash))
        {
            return new LoginResponse
            {
                Success = false,
                Message = "Tên đăng nhập hoặc mật khẩu không đúng"
            };
        }
        if (user.LockedUntil.HasValue && user.LockedUntil.Value > DateTime.UtcNow)
        {
            return new LoginResponse
            {
                Success = false,
                Message = "Tài khoản đã bị khóa"
            };
        }
        user.FailedLoginAttempts = 0;
        user.LastLoginAt = DateTime.UtcNow;
        await _unitOfWork.SaveChangesAsync();

        var token = _jwtService.GenerateToken(user);
        // TODO: Sinh refreshToken và expriedToken thực tế nếu có logic, tạm thời trả về mẫu
        var refreshToken = "sample-refresh-token";
        var expriedToken = DateTime.UtcNow.AddHours(1);
        return new LoginResponse
        {
            Success = true,
            Token = token,
            RefreshToken = refreshToken,
            ExpriedToken = expriedToken
        };
    }
} 