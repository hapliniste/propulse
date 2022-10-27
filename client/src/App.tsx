import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
      <header className="App-header">
        <p>
          Welcome to ProPulse!
        </p>
        <ul>
          {
            projects.map((project: any) => {
              return <li key={project.id}>{project.title}</li>
            })
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
