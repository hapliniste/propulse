using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace API.Controllers
{
    public class ProjectsController : BaseApiController
    {
        private readonly DataContext context;
        public ProjectsController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Project>>> GetProjects()
        {
            return await this.context.Projects.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(Guid id)
        {
            return await this.context.Projects.FindAsync(id);
        }
    }
}