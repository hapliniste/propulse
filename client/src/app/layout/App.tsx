import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
import { Project } from '../models/project';
import Navbar from './Navbar';
import ProjectsDashboard from '../../features/projects/dashboard/ProjectsDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

/*
[App container]
Stores: Routes, User
*/

function App() {
  const {projectStore} = useStore()

  useEffect(() => {
    projectStore.loadProjects();
  }, [projectStore]);

  return (
    <div className="App">
      <Navbar/>
      <Container style={{marginTop: '4em'}}>
        <ProjectsDashboard />      
      </Container>
    </div>
  );
}

export default observer(App);