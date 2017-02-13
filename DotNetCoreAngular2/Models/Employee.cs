using System;
using System.Collections.Generic;

namespace angularapp.Models
{
    public partial class Employee
    {
        public Employee()
        {
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}