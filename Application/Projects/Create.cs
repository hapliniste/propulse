using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistance;

namespace Application.Projects
{
    public class Create
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
            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                this.context.Projects.Add(request.Project);

                var result = await this.context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create project.");
                else return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}