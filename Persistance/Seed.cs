using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistance
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Projects.Any()) return;
            
            var projects = new List<Project>
            {
                new Project
                {
                    Title = "Past Project 1",
                    CreationDate = DateTime.Now.AddMonths(-2),
                    Description = "Project 2 months ago",
                },
                new Project
                {
                    Title = "Past Project 2",
                    CreationDate = DateTime.Now.AddMonths(-1),
                    Description = "Project 1 month ago",
                },
                new Project
                {
                    Title = "Future Project 1",
                    CreationDate = DateTime.Now.AddMonths(1),
                    Description = "Project 1 month in future",
                },
                new Project
                {
                    Title = "Future Project 2",
                    CreationDate = DateTime.Now.AddMonths(2),
                    Description = "Project 2 months in future",
                },
                new Project
                {
                    Title = "Future Project 3",
                    CreationDate = DateTime.Now.AddMonths(3),
                    Description = "Project 3 months in future",
                }
            };

            await context.Projects.AddRangeAsync(projects);
            await context.SaveChangesAsync();
        }
    }
}