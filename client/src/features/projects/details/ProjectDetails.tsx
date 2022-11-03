import { Button, Card } from "semantic-ui-react";
import { Project } from "../../../app/models/project";

interface Props {
    project: Project;
    openEditForm: () => void;
}

export default function ProjectDetails({project, openEditForm}: Props) {
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
                <Button onClick={() => openEditForm()} basic content='Edit'/>
            </Card.Content>
        </Card>
    )
}