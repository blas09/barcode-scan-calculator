import React from 'react';

import { Dimensions, Image, StyleSheet, Alert } from 'react-native';
import { Button, Container, Content, Form, Item, Input, Text } from 'native-base';
import { useForm, Controller } from "react-hook-form";

export default function Register() {
    const { control, handleSubmit, errors } = useForm();

    const onSubmit = () => {
        Alert.alert(
            "Submit",
            "Form is ready to submit!",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        )
    }

    return (
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
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </Item>
                    <Text style={styles.errorMessage}>{errors.username && errors.username.type === "required" && 'This field cannot be empty.'}</Text>
                    <Item regular>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <Input
                                    placeholder='Password'
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                            )}
                            name="password"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </Item>
                    <Text style={styles.errorMessage}>{errors.password && errors.password.type === "required" && 'This field cannot be empty.'}</Text>
                    <Item regular>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <Input
                                    placeholder='Confirm Password'
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                            )}
                            name="confirmedPassword"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </Item>
                    <Text style={styles.errorMessage}>{errors.confirmedPassword && errors.confirmedPassword.type === "required" && 'This field cannot be empty.'}</Text>
                    <Button block onPress={handleSubmit(onSubmit)}>
                        <Text>Register</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
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
