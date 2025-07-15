using CMS.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CMS.Application.Infrastructure.Filters
{
    public class AuthorizeFilter : IAuthorizationFilter
    {
        private readonly List<string> _privilegeValue;
        private readonly CmsDbContext _dbContext;        

        public AuthorizeFilter(string privilegeValue, bool isApi, CmsDbContext dbContext)
        {
            _privilegeValue = privilegeValue.Split(",").Select(c => c.Trim()).ToList();
            _dbContext = dbContext;            
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            throw new NotImplementedException();
        }
    }
}
