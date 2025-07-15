using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Common.Interfaces.Page
{
    public interface IPagingInfo
    {
        int Start { get; set; }
        int PageIndex { get; set; }
        int PageSize { get; set; }
        string? SearchTerm { get; set; }
        string? SortBy { get; set; }
        string? SortOrder { get; set; }
    }
}
