import React from 'react';

import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base';

export default function AppHeader() {
    return (
        <Header>
            <Left>
                <Button transparent>
                    <Icon name='menu' />
                </Button>
            </Left>
            <Body>
                <Title>Header</Title>
            </Body>
            <Right />
        </Header>
    );
}
