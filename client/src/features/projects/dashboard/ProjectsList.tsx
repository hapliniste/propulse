import { Button, Item, Segment } from "semantic-ui-react";
import { Project } from "../../../app/models/project";
import { useStore } from "../../../app/stores/store";

interface Props {
    projects: Project[];
}

export default function ProjectsList({projects}: Props){

    const {projectStore} = useStore()
    
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
                                    <Button floated='right' content='view' onClick={() => projectStore.selectProject(project.id)}/>
                                    <Button color='red' floated='right' content='delete' onClick={() => projectStore.deleteProject(project.id)}/>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    )
                })}
            </Item.Group>
        </Segment>
    )
}