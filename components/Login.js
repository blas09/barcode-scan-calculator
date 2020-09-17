import React, { useState } from 'react';

import { Dimensions, Image, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Container, Content, Form, Item, Input, Text } from 'native-base';

export default function Login() {
    const [password, setPassword] = useState('');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Container>
                <Content contentContainerStyle={styles.content}>
                    <Image source={require('../assets/logo.png')} style={styles.logo} />
                    <Form style={styles.form}>
                        <Item style={styles.item} regular>
                            <Input
                                placeholder='Password'
                                value={password}
                                onChangeText={password => setPassword(password)}
                                keyboardType="number-pad"
                                secureTextEntry
                            />
                        </Item>
                        <Button disabled={password.length < 5} block onPress={Keyboard.dismiss}>
                            <Text>Log in</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        </TouchableWithoutFeedback>
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
