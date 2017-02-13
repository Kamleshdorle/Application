using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using DotNetCoreAngular2.Models;
using angularapp.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DotNetCoreAngula2.Controllers
{
    [Route("api/[controller]")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true, Duration = -1)]
    public class EmployeeController : Controller
    {
        private dbContext _context;

        public EmployeeController(dbContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<dynamic>> EmployeeList()
        {
            return await _context.Employee.ToListAsync();
        }

        [HttpGet("[action]")]
        public async Task<dynamic> EmployeeById(int id)
        {
            return await _context.Employee.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        [HttpPost]
        public string Post([FromBody] Employee employee)
        {
            Response.StatusCode = 200;
            try
            {
                Employee newEmployee = new Employee();
                newEmployee.Name = employee.Name;
                newEmployee.Email = employee.Email;
                _context.Employee.Add(newEmployee);
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                return e.ToString();
            }
            return "OK";
        }

        [HttpPut]
        public string Put([FromBody] Employee employee)
        {
            Response.StatusCode = 200;
            try
            {
                employee.Name = employee.Name;
                employee.Email = employee.Email;
                _context.Employee.Attach(employee);
                _context.Entry(employee).State = EntityState.Modified;
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                return e.ToString();
            }
            return "OK";
        }

        [HttpDelete]
        public string Delete(int id)
        {
            Response.StatusCode = 200;
            try
            {
                Employee newEmployee = new Employee();
                newEmployee.Id = id;
                _context.Employee.Remove(newEmployee);
                _context.SaveChanges();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
            return "OK";
        }
    }
}
