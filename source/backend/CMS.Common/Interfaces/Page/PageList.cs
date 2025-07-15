using CMS.Common.Constants;
using Microsoft.EntityFrameworkCore;

namespace CMS.Common.Interfaces.Page
{
    public interface IPageList
    {
        int PageSize { get; set; }
        long TotalRecords { get; set; }
        int TotalPage { get; }
        int PageNo { get; set; }
    }
    public class PageList<T> : IPageList
    {        
        protected PageList(int pageNo, int pageSize)
        {
            this.PageNo = pageNo;
            this.PageSize = pageSize;
        }

        public int PageSize { get; set; }
        public long TotalRecords { get; set; }

        public int TotalPage => (int)(TotalRecords / PageSize) + (TotalRecords % PageSize > 0 ? 1 : 0);

        public int PageNo { get; set; }

        private int Skip => (PageSize * (PageNo - 1));

        public IEnumerable<T> DataRows { get; set; }

        public PageList(IEnumerable<T> rows
            , int pageNo = PageConstant.PAGING_INFO.DEFAULT_PAGE_NO
            , int pageSize = PageConstant.PAGING_INFO.DEFAULT_PAGE_SIZE
            ) : this(pageNo, pageSize)
        {
            this.TotalRecords = rows.LongCount();
            this.DataRows = rows.Skip(this.Skip).Take(PageSize).ToList();
        }

        public PageList(IQueryable<T> rows
            , int pageNo = PageConstant.PAGING_INFO.DEFAULT_PAGE_NO
            , int pageSize = PageConstant.PAGING_INFO.DEFAULT_PAGE_SIZE
            ) : this(pageNo, pageSize)
        {
            this.TotalRecords = rows.LongCount();
            this.DataRows = rows.Skip(this.Skip).Take(PageSize).ToList();
        }

        public static PageList<T> Instance(IQueryable<T> rows
            , int pageNo = PageConstant.PAGING_INFO.DEFAULT_PAGE_NO
            , int pageSize = PageConstant.PAGING_INFO.DEFAULT_PAGE_SIZE)
        {
            return InstanceAsync(rows, pageNo, pageSize).Result;
        }

        public static PageList<T> Instance(IEnumerable<T> rows
            , int pageNo = PageConstant.PAGING_INFO.DEFAULT_PAGE_NO
            , int pageSize = PageConstant.PAGING_INFO.DEFAULT_PAGE_SIZE)
        {
            var skip = (pageSize * (pageNo - 1));
            var data = rows.Skip(skip).Take(pageSize).ToList();

            return new PageList<T>(data, pageNo, pageSize);
        }

        public static async Task<PageList<T>> InstanceAsync(IQueryable<T> rows
            , int pageNo = PageConstant.PAGING_INFO.DEFAULT_PAGE_NO
            , int pageSize = PageConstant.PAGING_INFO.DEFAULT_PAGE_SIZE)
        {
            var skip = (pageSize * (pageNo - 1));
            var data = await rows.Skip(skip).Take(pageSize).ToListAsync();

            return new PageList<T>(data, pageNo, pageSize);
        }
    }
}
