import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from '../../features/projects/home/Homepage';
import ProjectsDashboard from '../../features/projects/dashboard/ProjectsDashboard';
import ProjectForm from '../../features/projects/form/ProjectForm';
import ProjectDetails from '../../features/projects/details/ProjectDetails';

/*
[App container]
Stores: User
*/

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Container style={{marginTop: '4em'}}>
        <Route path='/' exact component={Homepage}/>
        <Route path='/projects' exact component={ProjectsDashboard}/>
        <Route path='/project/:id' component={ProjectDetails}/>
        <Route path={['/createProject', '/manage/:id']} exact component={ProjectForm}/>
      </Container>
    </div>
  );
}

export default App;