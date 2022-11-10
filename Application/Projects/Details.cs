using Application.Core;
using Domain;
using MediatR;
using Persistance;

namespace Application.Projects
{
    public class Details
    {
        public class Query : IRequest<Result<Project>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Project>>
        {
            public DataContext Context { get; }
            public Handler(DataContext context)
            {
            this.Context = context;

            }
            public async Task<Result<Project>> Handle(Query request, CancellationToken cancellationToken)
            {
                var project = await this.Context.Projects.FindAsync(request.Id);
                return Result<Project>.Success(project);
            }
        }
    }
}