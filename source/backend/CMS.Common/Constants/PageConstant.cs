using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Common.Constants
{
    public class PageConstant
    {
        public struct PAGING_INFO
        {
            public const int DEFAULT_PAGE_SIZE = 20;
            public const int DEFAULT_PAGE_NO = 1;
        }

        public const string DEFAULT_ORDER_BY = "ModifiedDate";

        public struct COMPARE_OPERATOR
        {
            public const string EQUALS = "Equals";
            public const string CONTAINS = "Contains";
            public const string LESS_THAN = "LessThan";
            public const string LESS_THAN_OR_EQUAL = "LessThanOrEqual";
            public const string GREATER_THAN = "GreaterThan";
            public const string GREATER_THAN_OR_EQUAL = "GreaterThanOrEqual";
            public const string BETWEEN = "Between";
            public const string NOT_EQUALS = "NotEquals";
        }

        public struct JOIN_OPERATOR
        {
            public const string AND = "And";
            public const string OR = "Or";
        }
    }
}
