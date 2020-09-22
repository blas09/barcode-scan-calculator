import React, { useEffect }  from 'react';

import Layout from "./Layout";
import { Button, Content, Form, Input, Item, Text } from "native-base";
import { StyleSheet, Alert } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { runCrypto } from "../helper/Crypter";
import { updateUser } from "../store/actions/barcode.action";
import { useDispatch, useSelector } from "react-redux";
import i18n from 'i18n-js';

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
                i18n.t('success'),
                i18n.t('user_updated'),
                [{ text: "OK" }],
                { cancelable: false }
            );

            navigation.push('Account');
        });
    }

    const checkOldPass = oldPass => {
        return runCrypto(oldPass);
    }

    return (
        <Layout title={i18n.t('account_title')} navigation={navigation}>
            <Content contentContainerStyle={styles.content}>
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
                                    placeholder={i18n.t('old_password')}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType="number-pad"
                                    secureTextEntry
                                />
                            )}
                            name="oldPassword"
                            rules={{
                                required: i18n.t('rules.not_empty'),
                                minLength: {value: 5, message: i18n.t('rules.min_length_5')},
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
                                    placeholder={i18n.t('new_password')}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType="number-pad"
                                    secureTextEntry
                                />
                            )}
                            name="newPassword"
                            rules={{
                                required: i18n.t('rules.not_empty'),
                                minLength: {value: 5, message: i18n.t('rules.min_length_5')},
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
                                validate: value => value === pwd || i18n.t('pass_no_match'),
                            }}
                            defaultValue=""
                        />
                    </Item>
                    <Text style={styles.errorMessage}>{errors.confirmedPassword && errors.confirmedPassword.message}</Text>
                    <Button block onPress={handleSubmit(onSubmit)}>
                        <Text>{i18n.t('update')}</Text>
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
