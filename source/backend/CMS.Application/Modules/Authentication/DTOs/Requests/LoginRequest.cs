using MediatR;
using CMS.Application.Modules.Authentication.DTOs.Responses;

namespace CMS.Application.Modules.Authentication.DTOs.Requests;

public class LoginRequest : IRequest<LoginResponse>
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
} 