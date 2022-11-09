import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import { Project } from "../../../app/models/project";
import { useStore } from "../../../app/stores/store";

const ProjectDetails = () => {

    const {projectStore} = useStore();

    const {id} = useParams<{id: string}>();

    useEffect(() => {
        //console.log('id is: ' + id);
        if(id) projectStore.loadProject(id);
    }, [id, projectStore.loadProject]);
    
    //console.log('project is: ' + projectStore.selectedProject)
    //console.log(toJS(projectStore.selectedProject))
    return(
        projectStore.selectedProject ?
        <Card fluid>
            <Card.Content>
                <Card.Header>{projectStore.selectedProject.title}</Card.Header>
                <Card.Meta>{projectStore.selectedProject.creationDate}</Card.Meta>
                <Card.Description>
                    {projectStore.selectedProject.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as={Link} to={`/projects`} basic content='Cancel'/>
                <Button as={Link} to={`/manage/${projectStore.selectedProject.id}`} basic content='Edit'/>
            </Card.Content>
        </Card>
        : <></>
    )
}

export default observer(ProjectDetails);