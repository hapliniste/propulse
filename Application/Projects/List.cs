using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Projects
{
    public class List
    {
        public class Query : IRequest<List<Project>>
        {
            
        }

        public class Handler : IRequestHandler<Query, List<Project>>
        {
        private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<List<Project>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Projects.ToListAsync();
            }
        }
    }
}