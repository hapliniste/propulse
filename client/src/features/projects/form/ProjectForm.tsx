import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { Project } from "../../../app/models/project";
import { useStore } from "../../../app/stores/store";

const ProjectForm = () => {
    const history = useHistory();
    const {projectStore} = useStore();
    const {id} = useParams<{id: string}>();

    const initialState = projectStore.selectedProject ?? {
        id: '',
        title: '',
        description: '',
        creationDate: ''
    }

    const [project, setProject] = useState(initialState);

    useEffect(() => {
        //console.log("SelectedProject changed!")
        const initialState = projectStore.selectedProject ?? {
            id: '',
            title: '',
            description: '',
            creationDate: ''
        };
        setProject(initialState);
    }, [projectStore.selectedProject]);

    useEffect(() => {
        if(id){
            projectStore.loadProject(id);
        }
    },[id])

    const handleSubmit = () => {
        //console.log(project);
        projectStore.createOrEditProject(project).then(() => {
            history.push(`/projects`)
        });
        //NOTE: Il serait bon de faire le redirect sur le projet en question
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setProject({...project, [name]: value});
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' name='title' value={project.title} onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' name='description' value={project.description} onChange={handleInputChange}/>
                <Button as={Link} to={`/project/${id}`} basic content='Cancel'/>
                <Button floated='right' positive type='submit' content='Submit'/>
            </Form>
        </Segment>
    )
}

export default observer(ProjectForm);