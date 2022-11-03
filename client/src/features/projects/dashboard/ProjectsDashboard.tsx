import { Grid } from "semantic-ui-react";
import { Project } from "../../../app/models/project";
import ProjectDetails from "../details/ProjectDetails";
import ProjectForm from "../form/ProjectForm";
import ProjectsList from "./ProjectsList";

interface Props {
    projects: Project[];
    selectedProject: Project | undefined;
    selectProject: (id: string) => void;
    cancelSelectProject: () => void;
    editMode: boolean;
    openEditForm: (id: string) => void;
    closeEditForm: () => void;
    createOrEditProject: (project: Project) => void;
    deleteProject: (id: string) => void;
}

export default function ProjectsDashboard({
    projects, 
    selectedProject, 
    selectProject, 
    cancelSelectProject, 
    editMode, 
    openEditForm, 
    closeEditForm,
    createOrEditProject,
    deleteProject
}: Props)
{
    return(
        <Grid>
            <Grid.Column width='10'>
                <ProjectsList projects={projects} selectProject={selectProject} deleteProject={deleteProject}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedProject && <ProjectDetails project={selectedProject} openEditForm={() => openEditForm(selectedProject.id)}/>}
                {editMode && <ProjectForm selectedProject={selectedProject} closeEditForm={closeEditForm} createOrEditProject={createOrEditProject}/>}
            </Grid.Column>
        </Grid>
    )
}