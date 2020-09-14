import React, { useState, useEffect } from 'react';

import { Dimensions, Image, StyleSheet, Alert } from 'react-native';
import { Button, Container, Content, Form, Item, Input, Text } from 'native-base';

export default function Register() {
    const [username, setUsername] = useState({value: '', touched: false, valid: false, errorMessage: ''});
    const [password, setPassword] = useState({value: '', touched: false, valid: false, errorMessage: ''});
    const [confirmedPassword, setConfirmedPassword] = useState({value: '', touched: false, valid: false, errorMessage: ''});

    const submit = () => {
        if (false) {
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
            );
        }
    }

    return (
        <Container style={styles.container}>
            <Content contentContainerStyle={styles.content}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Form style={styles.form}>
                    <Item regular>
                        <Input
                            placeholder='Username'
                            value={username.value}
                            onChangeText={value => setUsername({...username, value: value, touched: true})}
                        />
                    </Item>
                    <Text style={styles.errorMessage}>{username.errorMessage}</Text>
                    <Item regular>
                        <Input
                            placeholder='Password'
                            value={password.value}
                            onChangeText={value => setPassword({...password, value: value, touched: true})}
                        />
                    </Item>
                    <Text style={styles.errorMessage}>{password.errorMessage}</Text>
                    <Item regular>
                        <Input
                            placeholder='Confirm Password'
                            value={confirmedPassword.value}
                            onChangeText={value => setConfirmedPassword({...confirmedPassword, value: value, touched: true})}
                        />
                    </Item>
                    <Text style={styles.errorMessage}>{confirmedPassword.errorMessage}</Text>
                    <Button block onPress={submit}>
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
