using Microsoft.AspNetCore.Mvc;
using System.Runtime.Serialization;

namespace CMS.Application.DTOs.Responses;


public class ApiSuccessResponse
{
    public ApiSuccessResponse(int statusCode, string message)
    {
        StatusCode = statusCode;
        Message = message;
    }
    public int StatusCode { get; set; }
    public string Message { get; set; }
}

public class ApiResponse<T> : ObjectResult
{
    [DataMember]
    public T Data { get; set; }

    public ApiResponse(int statusCode, string message = "")
        : base(new ApiSuccessResponse(statusCode, message))
    {
        StatusCode = statusCode;
    }

    public ApiResponse(T data, int statusCode = StatusCodes.Status200OK, string message = "")
        : base(new ApiSuccessResponse(statusCode, message))
    {
        Data = data;
        StatusCode = statusCode;
    }
}