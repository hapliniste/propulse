import { Button, Item, Segment } from "semantic-ui-react";
import { Project } from "../../../app/models/project";

interface Props {
    projects: Project[];
    selectProject: (id: string) => void;
    deleteProject: (id: string) => void;
}

export default function ProjectsList({projects, selectProject, deleteProject}: Props){
    return(
        <Segment>
            <Item.Group divided>
                {projects.map(project => {
                    return( 
                        <Item key={project.id}>
                            <Item.Content>
                                <Item.Header as='a'>{project.title}</Item.Header>
                                <Item.Meta>{project.creationDate}</Item.Meta>
                                <Item.Description>
                                    <div>{project.description}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button floated='right' content='view' onClick={() => selectProject(project.id)}/>
                                    <Button color='red' floated='right' content='delete' onClick={() => deleteProject(project.id)}/>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    )
                })}
            </Item.Group>
        </Segment>
    )
}