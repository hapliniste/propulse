using Application.Core;
using Domain;
using MediatR;
using Persistance;

namespace Application.Projects
{
    public class Delete{
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                Project project = await this.context.Projects.FindAsync(request.Id);
                if(project == null) return null;
                this.context.Remove(project);
                var result = await this.context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete project.");
                else return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}