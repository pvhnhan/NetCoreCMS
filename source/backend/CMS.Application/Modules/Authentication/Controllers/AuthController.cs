using MediatR;
using Microsoft.AspNetCore.Mvc;
using CMS.Application.Modules.Authentication.DTOs.Requests;
using CMS.Application.Modules.Authentication.DTOs.Responses;
using CMS.Application.DTOs.Responses;
using CMS.Application.Modules.Authentication.Queries;

namespace CMS.Application.Modules.Authentication.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IAccountQuery _accountQuery;

    public AuthController(IMediator mediator, IAccountQuery accountQuery)
    {
        _mediator = mediator;
        _accountQuery = accountQuery;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var response = await _mediator.Send(request);
        return Ok(new ApiResponse<LoginResponse>(data: response, message: response.Message ?? "", 
            statusCode: !string.IsNullOrEmpty(response.Token) ? 200 : 400));
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var response = await _mediator.Send(request);
        return Ok(response);
    }

    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var accessToken = GetAccessToken();
        var response = await _accountQuery.GetProfileAsync(accessToken);
        
        if (response == null)
        {
            return NotFound();
        }

        return Ok(new ApiResponse<UserProfileResponse>(data: response, message: "Lấy thông tin profile thành công"));
    }

    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        request.AccessToken = GetAccessToken();
        var response = await _mediator.Send(request);
        return Ok(response);
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
    {
        var response = await _mediator.Send(request);
        return Ok(response);
    }

    private string? GetAccessToken()
    {
        return Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
    }
} 