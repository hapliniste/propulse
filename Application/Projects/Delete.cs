using Domain;
using MediatR;
using Persistance;

namespace Application.Projects
{
    public class Delete{
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext context;
            public Handler(DataContext context)
            {
            this.context = context;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Project project = await this.context.Projects.FindAsync(request.Id);
                this.context.Remove(project);
                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}