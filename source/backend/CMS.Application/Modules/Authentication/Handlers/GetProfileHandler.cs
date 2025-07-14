using MediatR;
using CMS.Application.Modules.Authentication.DTOs.Requests;
using CMS.Application.Modules.Authentication.DTOs.Responses;
using CMS.Core.Interfaces;
using CMS.Application.Modules.Authentication.Services;

namespace CMS.Application.Modules.Authentication.Handlers;

public class GetProfileHandler : IRequestHandler<GetProfileRequest, UserProfileResponse>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IJwtService _jwtService;

    public GetProfileHandler(IUnitOfWork unitOfWork, IJwtService jwtService)
    {
        _unitOfWork = unitOfWork;
        _jwtService = jwtService;
    }

    public async Task<UserProfileResponse> Handle(GetProfileRequest request, CancellationToken cancellationToken)
    {
        var userId = _jwtService.GetUserIdFromToken(request.AccessToken ?? "");
        if (userId == null)
        {
            return new UserProfileResponse(); // Có thể bổ sung trường Success/Message nếu muốn
        }
        var user = await _unitOfWork.Users.GetByIdAsync(userId.Value);
        if (user == null)
        {
            return new UserProfileResponse();
        }
        return new UserProfileResponse
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Role = user.Role,
            LastLoginAt = user.LastLoginAt,
            FullName = user.FullName,
            Avatar = user.Avatar
        };
    }
} 