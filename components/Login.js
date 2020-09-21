import React, { useState, useEffect } from 'react';

import { Dimensions, Image, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Container, Content, Form, Item, Input, Text } from 'native-base';
import { login, setCameraPermission } from "../store/actions/auth.action";
import { useDispatch, useSelector } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
import { runCrypto } from "../helper/Crypter";

export default function Login() {
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const user = useSelector(state => state.barcode.user);
    const hasCameraPermission = useSelector(state => state.auth.hasCameraPermission);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        runCrypto(password).then(cryptedPass => {
            if (user.password === cryptedPass) {
                setErrorMessage('');
                dispatch(login());
            } else {
                setErrorMessage('Password invalid.');
                setPassword('');
            }
        });
    }

    useEffect(() => {
        if (null === hasCameraPermission) {
            (async () => {
                const { status } = await BarCodeScanner.requestPermissionsAsync();
                dispatch(setCameraPermission(status === 'granted'));
            })();
        }
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Container>
                <Content contentContainerStyle={styles.content}>
                    <Image source={require('../assets/logo.png')} style={styles.logo} />

                    <Text style={styles.username}>{user.username}</Text>

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
    },
    username: {
        marginVertical: 10,
        fontSize: 25,
    }
});
