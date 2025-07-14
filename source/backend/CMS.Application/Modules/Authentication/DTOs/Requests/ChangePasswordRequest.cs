using MediatR;
using CMS.Application.Modules.Authentication.DTOs.Responses;

namespace CMS.Application.Modules.Authentication.DTOs.Requests;

public class ChangePasswordRequest : IRequest<ChangePasswordResponse>
{
    public string OldPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
    public string? AccessToken { get; set; }
} 