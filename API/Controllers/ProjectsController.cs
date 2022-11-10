using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Application.Projects;

namespace API.Controllers
{
    public class ProjectsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            return HandleResult(await this.Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject(Project project)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Project = project}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProject(Guid id, Project project)
        {
            project.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Project = project}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }
    }
}