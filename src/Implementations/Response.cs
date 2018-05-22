using System;
using System.Collections.Generic;
using System.Security.Permissions;
using System.Text;

namespace Implementations
{
    class Response
    {
        public bool Success { get; set; }
        public DateTime Challenge_Ts { get; set; }
        public string Hostname { get; set; }
    }
}
