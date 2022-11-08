import { Button, Card } from "semantic-ui-react";
import { Project } from "../../../app/models/project";
import { useStore } from "../../../app/stores/store";

interface Props {
    project: Project;
}

export default function ProjectDetails({project}: Props) {

    const {projectStore} = useStore()
    
    return(
        <Card fluid>
            <Card.Content>
                <Card.Header>{project.title}</Card.Header>
                <Card.Meta>{project.creationDate}</Card.Meta>
                <Card.Description>
                    {project.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button onClick={() => projectStore.openEditForm(true)} basic content='Edit'/>
            </Card.Content>
        </Card>
    )
}