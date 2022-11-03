import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    cancelSelectProject: () => void;
    openEditForm: () => void;
    closeEditForm: () => void;
}

export default function Navbar({cancelSelectProject, openEditForm, closeEditForm}: Props) {
    return(
        <Menu fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" onClick={() => {
                        cancelSelectProject();
                        closeEditForm();
                    }}/>
                </Menu.Item>
                <Menu.Item name='Feed'/>
                <Menu.Item name='Projects'/>
                <Menu.Item>
                    <Button onClick={() => openEditForm()} content='Create project'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}