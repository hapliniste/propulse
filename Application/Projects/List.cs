using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Projects
{
    public class List
    {
        public class Query : IRequest<Result<List<Project>>>
        {
            
        }

        public class Handler : IRequestHandler<Query, Result<List<Project>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Project>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Project>>.Success(await this.context.Projects.ToListAsync());
            }
        }
    }
}