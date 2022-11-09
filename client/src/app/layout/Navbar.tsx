import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function Navbar() {

    const {projectStore} = useStore()
    return(
        <Menu fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" onClick={() => {
                        projectStore.selectProject();
                        projectStore.openEditForm(false);
                    }}/>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/projects' name='Projects'/>
                <Menu.Item as={NavLink} to='/createProject'>
                    <Button onClick={() => {
                        projectStore.selectProject();
                        projectStore.openEditForm(true);
                    }} content='Create project'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}