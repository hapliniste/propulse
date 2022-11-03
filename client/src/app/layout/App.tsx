import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Project } from '../models/project';
import Navbar from './Navbar';
import ProjectsDashboard from '../../features/projects/dashboard/ProjectsDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Project[]>('http://localhost:5000/api/projects').then(res => {
      setProjects(res.data);
      console.log(res);
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
    project.id
      ? setProjects([...projects.filter(x => x.id !== project.id), project])
      : setProjects([...projects, {...project, id: uuid()}]);
      setEditMode(false);
      setSelectedProject(project);
  }

  const handleDeleteProject = (id: string) => {
    setProjects([...projects.filter(x => x.id !== id)]);
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