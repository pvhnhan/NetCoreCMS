using MediatR;
using CMS.Application.Modules.Authentication.DTOs.Responses;

namespace CMS.Application.Modules.Authentication.DTOs.Requests;

public class GetProfileRequest : IRequest<UserProfileResponse>
{
    public string? AccessToken { get; set; }
} 