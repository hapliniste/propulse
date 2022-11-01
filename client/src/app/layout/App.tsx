import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import { Project } from '../models/project';
import Navbar from './Navbar';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios.get<Project[]>('http://localhost:5000/api/projects').then(res => {
      setProjects(res.data);
      console.log(res);
    })
  }, []);

  return (
    <div className="App">
      <Navbar/>
      <Container style={{marginTop: '4em'}}>
        <List>
          {
            projects.map(project => {
              return <List.Item key={project.id}>{project.title}</List.Item>
            })
          }
        </List>
      </Container>
    </div>
  );
}

export default App;