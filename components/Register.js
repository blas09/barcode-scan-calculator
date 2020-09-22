import React from 'react';

import { Dimensions, Image, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, Container, Content, Form, Item, Input, Text } from 'native-base';
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/actions/barcode.action";
import { runCrypto } from "../helper/Crypter";
import i18n from 'i18n-js';

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
                                    placeholder={i18n.t('username')}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                            )}
                            name="username"
                            rules={{ required: i18n.t('rules.not_empty') }}
                            defaultValue=""
                        />
                    </Item>
                    <Text style={styles.errorMessage}>{errors.username && errors.username.message}</Text>
                    <Item regular>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <Input
                                    placeholder={i18n.t('password')}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType="number-pad"
                                    secureTextEntry
                                />
                            )}
                            name="password"
                            rules={{
                                required: i18n.t('not_empty'),
                                minLength: {value: 5, message: i18n.t('rules.min_length_5')},
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
                                    placeholder={i18n.t('confirm_password')}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType="number-pad"
                                    secureTextEntry
                                />
                            )}
                            name="confirmedPassword"
                            rules={{
                                required: i18n.t('rules.not_empty'),
                                minLength: {value: 5, message: i18n.t('rules.min_length_5')},
                                validate: value => value === pwd || i18n.t('rules.pass_no_match'),
                            }}
                            defaultValue=""
                        />
                    </Item>
                    <Text style={styles.errorMessage}>{errors.confirmedPassword && errors.confirmedPassword.message}</Text>
                    <Button block onPress={handleSubmit(onSubmit)}>
                        <Text>{i18n.t('register')}</Text>
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
