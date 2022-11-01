import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function Navbar() {
    return(
        <Menu fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo"/>
                </Menu.Item>
                <Menu.Item name='Feed'/>
                <Menu.Item name='Projects'/>
                <Menu.Item>
                    <Button content='Create project'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}