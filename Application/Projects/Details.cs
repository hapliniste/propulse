using Domain;
using MediatR;
using Persistance;

namespace Application.Projects
{
    public class Details
    {
        public class Query : IRequest<Project>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Project>
        {
            public DataContext Context { get; }
            public Handler(DataContext context)
            {
            this.Context = context;

            }
            public async Task<Project> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.Context.Projects.FindAsync(request.Id);
            }
        }
    }
}