import { observer } from "mobx-react-lite";
import { useEffect } from "react";
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

const ProjectsDashboard = () =>
{
    const {projectStore} = useStore()

    useEffect(() => {
        projectStore.loadProjects();
    }, [projectStore]);
    
    return(
        <Grid>
            <Grid.Column width='16'>
                <ProjectsList projects={projectStore.projects}/>
            </Grid.Column>
            {/*<Grid.Column width='6'>
                {projectStore.selectedProject && <ProjectDetails project={projectStore.selectedProject}/>}
                {projectStore.editMode && <ProjectForm selectedProject={projectStore.selectedProject}/>}
    </Grid.Column>*/}
        </Grid>
    )
}

export default observer(ProjectsDashboard);