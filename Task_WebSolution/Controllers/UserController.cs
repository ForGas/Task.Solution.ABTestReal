using AutoMapper;
using System.Linq;
using System.Threading.Tasks;
using Task_WebSolution.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Task_WebSolution.Services;
using System.Collections.Generic;
using Task_WebSolution.Context.Model;
using Task_WebSolution.Services.Interfaces;
using Task_WebSolution.Context.Repositories;
using System;

namespace Task_WebSolution.Controllers
{
    [Route("[controller]s")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IFileService<TextFormat> _fileService;

        public UserController(UserRepository userRepository, IMapper mapper, IFileService<TextFormat> fileService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _fileService = fileService;
        }

        // PATCH : users
        [HttpPatch]
        public async Task<ActionResult> UpdateDatesForUsersAsync([FromBody] List<UserDto> fullDataUsers)
        {
            if (ModelState.IsValid)
            {
                await _userRepository
                        .MultiSaveAsync(fullDataUsers
                            .Select(x => _mapper.Map<User>(x)));

                return NoContent();
            }

            return BadRequest(fullDataUsers);
        }

        // GET : users
        [HttpGet]
        public ActionResult<List<UserDto>> GetUsersWithoutDate()
        {
            return _userRepository.GetAll()
                .Where(x => x.DateRegistration is null && x.DateLastActivity is null)
                    .Take(10)
                        .Select(x => _mapper.Map<UserDto>(x))
                            .ToList();
        }

        // GET : users/full
        [HttpGet("full")]
        public ActionResult<List<UserDto>> GetUsersWithFullInfo()
        {
            return _userRepository.GetAll()
                .Where(x => x.DateRegistration is not null && x.DateLastActivity is not null)
                    .Select(x => _mapper.Map<UserDto>(x))
                        .ToList();
        }

        // DELETE : users/5
        [HttpDelete("{id}")]
        public ActionResult Delete(long id)
        {
            var user = _userRepository.Get(id);

            return user is null
                ? NotFound(user)
                : _userRepository.Remove(user)
                    ? StatusCode(StatusCodes.Status204NoContent)
                    : StatusCode(StatusCodes.Status400BadRequest);
        }

        // GET : users/logs
        [HttpGet("logs")]
        public async Task<ActionResult<string>> GetLogsAsync()
        {
            var logFileName = "log.txt";

            var logFilesList = _fileService.FindFilesNameByExtension(logFileName);

            if (logFilesList == null)
            {
                return NotFound();
            }

            var fileName = _fileService.GetLastLogFileName(logFilesList, logFileName);

            var result = await _fileService.ReadLogsInFileAsync(fileName);

            return Ok(result!
                            .Split("\r\n", StringSplitOptions.RemoveEmptyEntries)
                                .TakeLast(5));
        }
    }
}
