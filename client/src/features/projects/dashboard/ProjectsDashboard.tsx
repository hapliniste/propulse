import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { Project } from "../../../app/models/project";
import { useStore } from "../../../app/stores/store";
import ProjectDetails from "../details/ProjectDetails";
import ProjectForm from "../form/ProjectForm";
import ProjectsList from "./ProjectsList";

/*
[ProjectDashboard container]
Stores: Projects
*/

/*interface Props {
    projects: Project[];
    selectedProject: Project | undefined;
    editMode: boolean;
}*/

const ProjectsDashboard = (/*{
    projects, 
    selectedProject, 
    editMode
}: Props*/) =>
{
    const {projectStore} = useStore()
    
    return(
        <Grid>
            <Grid.Column width='10'>
                <ProjectsList projects={projectStore.projects}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {projectStore.selectedProject && <ProjectDetails project={projectStore.selectedProject}/>}
                {projectStore.editMode && <ProjectForm selectedProject={projectStore.selectedProject}/>}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ProjectsDashboard);