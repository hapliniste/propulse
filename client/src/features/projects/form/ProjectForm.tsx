import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Project } from "../../../app/models/project";

interface Props {
    selectedProject: Project | undefined;
    closeEditForm: () => void;
    createOrEditProject: (project: Project) => void;
}

export default function ProjectForm({selectedProject, closeEditForm, createOrEditProject}: Props) {

    const initialState = selectedProject ?? {
        id: '',
        title: '',
        description: '',
        creationDate: ''
    }

    const [project, setProject] = useState(initialState);

    const handleSubmit = () => {
        console.log(project);
        createOrEditProject(project);
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
                <Button onClick={() => closeEditForm()} basic content='Cancel'/>
                <Button floated='right' positive type='submit' content='Submit'/>
            </Form>
        </Segment>
    )
}