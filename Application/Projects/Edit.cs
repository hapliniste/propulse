using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistance;

namespace Application.Projects
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Project Project { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Project).SetValidator(new ProjectValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Project project = await this.context.Projects.FindAsync(request.Project.Id);

                if(project == null) return null;
                
                this.mapper.Map(request.Project, project);

                var result = await this.context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update project.");
                else return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}