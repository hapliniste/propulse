import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects').then(res => {
      setProjects(res.data);
      console.log(res);
    })
  }, []);

  return (
    <div className="App">
      <Header as='h2' icon='users' content='ProPulse'/>
      <List>
        {
          projects.map((project: any) => {
            return <List.Item key={project.id}>{project.title}</List.Item>
          })
        }
      </List>
    </div>
  );
}

export default App;
