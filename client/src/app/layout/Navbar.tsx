import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function Navbar() {

    const {projectStore} = useStore()
    return(
        <Menu fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" onClick={() => {
                        projectStore.selectProject();
                        projectStore.openEditForm(false);
                    }}/>
                </Menu.Item>
                <Menu.Item name='Feed'/>
                <Menu.Item name='Projects'/>
                <Menu.Item>
                    <Button onClick={() => {
                        projectStore.selectProject();
                        projectStore.openEditForm(true);
                    }} content='Create project'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}