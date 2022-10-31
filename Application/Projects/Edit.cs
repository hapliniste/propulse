using AutoMapper;
using Domain;
using MediatR;
using Persistance;

namespace Application.Projects
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Project Project { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Project project = await this.context.Projects.FindAsync(request.Project.Id);
                
                this.mapper.Map(request.Project, project);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}