import React, { useEffect }  from 'react';

import Layout from "./Layout";
import barcodeConstants from "../store/constants/barcode.constant";
import { Button, Content, Form, Input, Item, Text } from "native-base";
import { StyleSheet, Alert } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { runCrypto } from "../helper/Crypter";
import { updateUser } from "../store/actions/barcode.action";
import { useDispatch, useSelector } from "react-redux";

export default function Account({ navigation }) {
    const { control, handleSubmit, errors, setValue, watch } = useForm();
    const user = useSelector(state => state.barcode.user);
    const dispatch = useDispatch();
    let pwd = watch("newPassword");

    useEffect(() => {
        setValue('username', user.username);
    }, []);

    const onSubmit = data => {
        runCrypto(data.newPassword).then(encryptedPass => {
            dispatch(updateUser({
                username: data.username,
                password: encryptedPass,
            }));

            Alert.alert(
                "Success",
                "User info was successfully updated.",
                [{ text: "OK"}],
                { cancelable: false }
            );

            navigation.push('Account');
        });
    }

    const checkOldPass = oldPass => {
        return runCrypto(oldPass);
    }

    return (
        <Layout title={barcodeConstants.ACCOUNT_TITLE} navigation={navigation}>
            <Content contentContainerStyle={styles.content}>
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
                                    placeholder='Old Password'
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType="number-pad"
                                    secureTextEntry
                                />
                            )}
                            name="oldPassword"
                            rules={{
                                required: 'This field cannot be empty.',
                                minLength: {value: 5, message: 'Password must have at least 5 characters.'},
                                validate: async value => await checkOldPass(value).then(val => val === user.password) || "Password invalid.",
                            }}
                            defaultValue=""
                        />
                    </Item>
                    <Text style={styles.errorMessage}>{errors.oldPassword && errors.oldPassword.message}</Text>
                    <Item regular>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <Input
                                    placeholder='New Password'
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType="number-pad"
                                    secureTextEntry
                                />
                            )}
                            name="newPassword"
                            rules={{
                                required: 'This field cannot be empty.',
                                minLength: {value: 5, message: 'Password must have at least 5 characters.'},
                            }}
                            defaultValue=""
                        />
                    </Item>
                    <Text style={styles.errorMessage}>{errors.newPassword && errors.newPassword.message}</Text>
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
        </Layout>
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
    errorMessage: {
        marginBottom: 10,
        color: 'red',
        fontSize: 12,
    }
});
