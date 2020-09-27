import React from 'react';

import {Header, Left, Body, Title, Right} from 'native-base';
import {StyleSheet} from "react-native";

export default function AppHeader({title}) {
    return (
        <Header>
            <Left style={styles.left}/>
            <Body style={styles.body}>
                <Title style={styles.title}>{title.toUpperCase()}</Title>
            </Body>
            <Right style={styles.right}/>
        </Header>
    );
}

const styles = StyleSheet.create({
    left: {
        flex: 1,
    },
    body: {
        flex: 2,
    },
    right: {
        flex: 1,
    },
    title: {
        alignSelf: 'center',
    }
});

