import React from 'react';

import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Button, Container, Content, Form, Item, Input, Text } from 'native-base';

export default function FixedLabelExample() {
    return (
        <Container>
            <Content contentContainerStyle={styles.content}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
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
    logo: {
        width: (Dimensions.get('window').width / 5) * 2,
        height: (Dimensions.get('window').width / 5) * 2,
    }
});
