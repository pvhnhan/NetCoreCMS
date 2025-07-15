using CMS.Common.Interfaces.Repositories;
using CMS.Core.Entities;
using CMS.Application.Modules.Authentication.DTOs.Responses;
using CMS.Application.Modules.Authentication.Services;

namespace CMS.Application.Modules.Authentication.Queries
{
    public interface IAccountQuery
    {
        Task<UserProfileResponse?> GetProfileAsync(string accessToken);
    }

    public class AccountQuery : IAccountQuery
    {
        private readonly IEntityRepository<User> _userRepository;
        private readonly IJwtService _jwtService;

        public AccountQuery(IEntityRepository<User> userRepository, IJwtService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        public async Task<UserProfileResponse?> GetProfileAsync(string accessToken)
        {
            var userId = _jwtService.GetUserIdFromToken(accessToken);
            if (userId == null)
            {
                return null;
            }

            var user = await _userRepository.FindAsync(u => u.Id == userId.Value && u.IsActive);
            if (user == null)
            {
                return null;
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
}
