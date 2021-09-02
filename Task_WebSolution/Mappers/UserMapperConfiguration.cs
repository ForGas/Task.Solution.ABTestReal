using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Task_WebSolution.Context.Model;
using Task_WebSolution.Mappers.Base;
using Task_WebSolution.Models;

namespace Task_WebSolution.Mappers
{
    public class UserMapperConfiguration : MapperConfigurationBase
    {
        public UserMapperConfiguration()
        {
            CreateMap<User, UserDto>()
                .ForMember(userDto => userDto.Id, opt => opt.MapFrom(user => user.Id))

                .ForMember(userDto => userDto.DateRegistration,
                    opt => opt.MapFrom(user => user.DateRegistration != null
                        ? string.Format("dd/MM/yyyy", user.DateRegistration)
                        : string.Empty))

                .ForMember(userDto => userDto.DateLastActivity,
                    opt => opt.MapFrom(user => user.DateLastActivity != null
                        ? string.Format("dd/MM/yyyy", user.DateLastActivity)
                        : string.Empty));

            CreateMap<UserDto, User>()
                .ForMember(user => user.Id, opt => opt.MapFrom(userDto => userDto.Id))

                .ForMember(user => user.DateRegistration,
                    opt => opt.MapFrom(userDto => userDto.DateRegistration != null
                        ? DateTime.ParseExact(userDto.DateRegistration, "dd/MM/yyyy", CultureInfo.InvariantCulture)
                        : new DateTime?()))

                .ForMember(user => user.DateLastActivity,
                    opt => opt.MapFrom(userDto => userDto.DateLastActivity != null
                        ? DateTime.ParseExact(userDto.DateLastActivity, "dd/MM/yyyy", CultureInfo.InvariantCulture)
                        : new DateTime?()));
        }
    }
}
