using System;
using FluentValidation;
using System.Globalization;
using Task_WebSolution.Models;

namespace Task_WebSolution.Context.Validators
{
    public class UserDtoValidator : AbstractValidator<UserDto>
    {
        public UserDtoValidator()
        {
            RuleFor(x => x.Id)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                    .WithMessage(x => $"Id is null! User Id: {x.Id}")
                .NotEmpty()
                    .WithMessage(x => $"Id is empty! User Id: {x.Id}");

            RuleFor(x => x.DateRegistration)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                    .WithMessage(x => $"Date registration is null! User Id: {x.Id}")
                .NotEmpty()
                    .WithMessage(x => $"Date registration should be not empty! User Id: {x.Id}")
                .Length(10)
                    .WithMessage(x => $"Date registration should be is full! User Id: {x.Id}")
                .Must(IsValidCorrectDate)
                    .WithMessage(x => $"Date registration nonexistent date! User Id: {x.Id}")
                .Must(x => DateTime.Parse(x) <= DateTime.Now)
                        .WithMessage(x => $"Date registration should be no more than the present! User Id: {x.Id}");

            RuleFor(x => x.DateLastActivity)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                    .WithMessage(x => $"Date last activity is null! User Id: {x.Id}")
                .NotEmpty()
                    .WithMessage(x => $"Date last activity should be not empty! User Id: {x.Id}")
                .Length(10)
                    .WithMessage(x => $"Date last activity should be is full! User Id: {x.Id}")
                .Must(IsValidCorrectDate)
                    .WithMessage(x => $"Date last activity nonexistent date! User Id: {x.Id}")
                .Must(x => DateTime.Parse(x) <= DateTime.Now)
                    .WithMessage(x => $"Date last activity should be no more than the present! User Id: {x.Id}");


            RuleFor(x => x).Custom((x, context) =>
            {
                bool isValid = IsValidCorrectDate(x.DateRegistration)
                    && IsValidCorrectDate(x.DateLastActivity);

                if (isValid)
                {
                    var dateRegistration = DateTime.Parse(x.DateRegistration.Replace('.', '/'));
                    var dateLastActivity = DateTime.Parse(x.DateLastActivity.Replace('.', '/'));

                    if (dateRegistration > dateLastActivity)
                    {
                        context.AddFailure($"Date registration should be less than last activity! User Id: {x.Id}");
                    }
                }
            });
        }

        private static bool IsValidCorrectDate(string dateString)
        {
            return DateTime.TryParseExact(dateString.Replace('.', '/'),
                        "dd/MM/yyyy", CultureInfo.InvariantCulture,
                            DateTimeStyles.None, out DateTime parsedDate);
        }

    }
}
