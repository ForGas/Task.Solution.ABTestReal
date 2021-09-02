using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task_WebSolution.Context.Model;
using Task_WebSolution.Context.Repositories;
using Task_WebSolution.Context.Validators;
using Task_WebSolution.Models;

namespace Task_WebSolution.Controllers
{
    [Route("[controller]s")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserRepository _userRepository;
        private IMapper _mapper;


        public UserController(UserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }


        [HttpPost]
        public ActionResult PostListUser([FromBody] IEnumerable<UserDto> users)
        {
            if (users == null)
            {
                return BadRequest($"Error {users} is null ");
            }

            if (ModelState.IsValid)
            {
                foreach (var user in users)
                {
                    if (_userRepository.Get(user.Id) == null)
                    {
                        _userRepository.Save(_mapper.Map<User>(user));
                    }
                    else
                    {
                        return BadRequest("Duplicate id");
                    }
                }

                return Ok("Saved");
            }


            return BadRequest("Error");
        }

        [HttpGet("test")]
        public ActionResult GetTest()
        {
            return null;
        }

        [HttpPatch]
        public ActionResult UpdateDates([FromBody]List<UserDto> fullDataUsers)
        {
            if (ModelState.IsValid)
            {
                //fullDataUsers.ForEach(x => 
                //    _userRepository.Save(_mapper.Map<User>(x)));

                return NoContent();
            }

            return BadRequest(ModelState);
        }

        [HttpGet]
        public List<UserDto> GetUsers()
        {
            return _userRepository.GetAll()
                .Where(x => x.DateRegistration is null && x.DateLastActivity is null)
                    .Take(10)
                        .Select(x => _mapper.Map<UserDto>(x))
                        .ToList();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var user = _userRepository.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _userRepository.Remove(user);

            return Ok($"Delete {user}");
        }
    }
}
