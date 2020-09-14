import React from 'react';

import { Dimensions, Image, StyleSheet } from 'react-native';
import { Button, Container, Content, Form, Item, Input, Text } from 'native-base';

export default function Login() {
    return (
        <Container>
            <Content contentContainerStyle={styles.content}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Form style={styles.form}>
                    <Item style={styles.item} regular>
                        <Input placeholder='Password' />
                    </Item>
                    <Button block>
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
    logo: {
        width: (Dimensions.get('window').width / 5) * 2,
        height: (Dimensions.get('window').width / 5) * 2,
    },
    item: {
        marginBottom: 10,
    }
});
