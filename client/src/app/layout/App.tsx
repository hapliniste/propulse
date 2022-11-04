import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Project } from '../models/project';
import Navbar from './Navbar';
import ProjectsDashboard from '../../features/projects/dashboard/ProjectsDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    /*axios.get<Project[]>('http://localhost:5000/api/projects').then(res => {
      setProjects(res.data);
      console.log(res);
    })*/
    agent.Projects.list().then(response => {
      setProjects(response);
    })
  }, []);

  const  handleSelectedProject = (id: string): void => {
    setSelectedProject(projects.find(x => x.id === id));
  }
  const  handleCancelSelectedProject = (): void => {
    setSelectedProject(undefined);
  }

  const handleOpenEditForm = (id?: string) => {
    id ? handleSelectedProject(id) : handleCancelSelectedProject();
    setEditMode(true);
  }
  const handleCloseEditForm = () => {
    setEditMode(false);
  }

  const handleCreateOrEditProject = (project: Project) => {
    /*project.id
      ? setProjects([...projects.filter(x => x.id !== project.id), project])
      : setProjects([...projects, {...project, id: uuid()}]);
      setEditMode(false);
      setSelectedProject(project);*/

    setSubmitting(true);
    if(project.id)
    {
      agent.Projects.update(project).then(() => {
        setProjects([...projects.filter(x => x.id !== project.id), project])
        setEditMode(false);
        setSelectedProject(project);
        setSubmitting(false);
      })
    }
    else
    {
      project.id = uuid();
      project.creationDate = new Date().toISOString();
      agent.Projects.create(project).then(() => {
        setProjects([...projects, project]);
        setEditMode(false);
        setSelectedProject(project);
        setSubmitting(false);
      })
    }
  }

  const handleDeleteProject = (id: string) => {
    setSubmitting(true);
    agent.Projects.delete(id).then(() => {
      setProjects([...projects.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  return (
    <div className="App">
      <Navbar cancelSelectProject={handleCancelSelectedProject} openEditForm={handleOpenEditForm} closeEditForm={handleCloseEditForm}/>
      <Container style={{marginTop: '4em'}}>
        <ProjectsDashboard 
        projects={projects}
        selectedProject={selectedProject}
        selectProject={handleSelectedProject}
        cancelSelectProject={handleCancelSelectedProject}
        editMode={editMode}
        openEditForm={handleOpenEditForm}
        closeEditForm={handleCloseEditForm}
        createOrEditProject={handleCreateOrEditProject}
        deleteProject={handleDeleteProject}
        />      
      </Container>
    </div>
  );
}

export default App;