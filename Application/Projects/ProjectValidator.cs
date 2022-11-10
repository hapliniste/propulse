using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Projects
{
    public class ProjectValidator : AbstractValidator<Project>
    {
        public ProjectValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.CreationDate).NotEmpty().LessThanOrEqualTo(DateTime.Now);
        }
    }
}