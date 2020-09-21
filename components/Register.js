import React from 'react';

import { Dimensions, Image, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, Container, Content, Form, Item, Input, Text } from 'native-base';
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/actions/barcode.action";
import { runCrypto } from "../helper/Crypter";

export default function Register() {
    const { control, handleSubmit, errors, watch } = useForm();
    const dispatch = useDispatch();
    let pwd = watch("password");

    const onSubmit = data => {
        runCrypto(data.password).then(encryptedPass => {
            dispatch(registerUser({
                username: data.username,
                password: encryptedPass,
            }));
        });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Container style={styles.container}>
            <Content contentContainerStyle={styles.content}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Form style={styles.form}>
                    <Item regular>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <Input
                                    placeholder='Username'
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                            )}
                            name="username"
                            rules={{ required: 'This field cannot be empty.' }}
                            defaultValue=""
                        />
                    </Item>
                    <Text style={styles.errorMessage}>{errors.username && errors.username.message}</Text>
                    <Item regular>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <Input
                                    placeholder='Password'
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType="number-pad"
                                    secureTextEntry
                                />
                            )}
                            name="password"
                            rules={{
                                required: 'This field cannot be empty.',
                                minLength: {value: 5, message: 'Password must have at least 5 characters.'},
                            }}
                            defaultValue=""
                        />
                    </Item>
                    <Text style={styles.errorMessage}>{errors.password && errors.password.message}</Text>
                    <Item regular>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <Input
                                    placeholder='Confirm Password'
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType="number-pad"
                                    secureTextEntry
                                />
                            )}
                            name="confirmedPassword"
                            rules={{
                                required: 'This field cannot be empty.',
                                minLength: {value: 5, message: 'Password must have at least 5 characters.'},
                                validate: value => value === pwd || "Passwords don't match.",
                            }}
                            defaultValue=""
                        />
                    </Item>
                    <Text style={styles.errorMessage}>{errors.confirmedPassword && errors.confirmedPassword.message}</Text>
                    <Button block onPress={handleSubmit(onSubmit)}>
                        <Text>Register</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
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
    errorMessage: {
        marginBottom: 10,
        color: 'red',
        fontSize: 12,
    }
});
