import React, { useState } from 'react';

import { Dimensions, Image, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Container, Content, Form, Item, Input, Text } from 'native-base';
import { login } from "../store/actions/barcode.action";
import {useDispatch, useSelector} from "react-redux";

export default function Login() {
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const user = useSelector(state => state.barcode.user);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (user.password === password) {
            setErrorMessage('');
            dispatch(login());
        } else {
            setErrorMessage('Password invalid.');
            setPassword('');
        }
    }

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
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                        <Button block disabled={password.length < 5} onPress={handleSubmit}>
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
    },
    errorMessage: {
        marginBottom: 10,
        color: 'red',
        fontSize: 12,
    }
});
