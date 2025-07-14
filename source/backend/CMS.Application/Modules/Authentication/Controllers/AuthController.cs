using MediatR;
using Microsoft.AspNetCore.Mvc;
using CMS.Application.Modules.Authentication.DTOs.Requests;
using CMS.Application.Modules.Authentication.DTOs.Responses;
using CMS.Application.DTOs.Responses;

namespace CMS.Application.Modules.Authentication.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;
    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var response = await _mediator.Send(request);
        return Ok(new ApiResponse<LoginResponse>(data: response, message: "success"));
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
        var response = await _mediator.Send(new GetProfileRequest { AccessToken = GetAccessToken() });
        return Ok(new ApiResponse<UserProfileResponse>(data: response, message: "success"));
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