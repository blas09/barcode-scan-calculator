import React from 'react';

import { StyleSheet } from 'react-native';
import { Button, Container, Header, Content, Form, Item, Input, Label, Text } from 'native-base';

export default function FixedLabelExample() {
    return (
        <Container>
            <Header />
            <Content contentContainerStyle={styles.content}>
                <Form style={styles.form}>
                    <Item regular>
                        <Input placeholder='Password' />
                    </Item>
                    <Button style={styles.button} block>
                        <Text>Log in</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    form: {
        width: '80%',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginVertical: 10,
    },
});
