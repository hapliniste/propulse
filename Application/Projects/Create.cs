using Domain;
using MediatR;
using Persistance;

namespace Application.Projects
{
    public class Create
    {
        public class Command : IRequest
        {
            public Project Project { get; set; }
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
                this.context.Projects.Add(request.Project);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}