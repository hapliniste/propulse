import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Project } from "../../../app/models/project";
import { useStore } from "../../../app/stores/store";

interface Props {
    selectedProject: Project | undefined;
}

export default function ProjectForm({selectedProject}: Props) {

    const {projectStore} = useStore();

    const initialState = selectedProject ?? {
        id: '',
        title: '',
        description: '',
        creationDate: ''
    }

    const [project, setProject] = useState(initialState);

    useEffect(() => {
        //console.log("SelectedProject changed!")
        const initialState = selectedProject ?? {
            id: '',
            title: '',
            description: '',
            creationDate: ''
        };
        setProject(initialState);
    }, [selectedProject]);

    const handleSubmit = () => {
        console.log(project);
        projectStore.createOrEditProject(project);
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
                <Button onClick={() => projectStore.openEditForm(false)} basic content='Cancel'/>
                <Button floated='right' positive type='submit' content='Submit'/>
            </Form>
        </Segment>
    )
}