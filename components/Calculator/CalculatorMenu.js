import React from 'react';

import Layout from "../Layout";
import {Button, Content, Icon, Text} from "native-base";
import {Dimensions, StyleSheet} from "react-native";
import i18n from 'i18n-js';

export default function CalculatorMenu({navigation}) {
    return (
        <Layout title={i18n.t('home_title')} navigation={navigation}>
            <Content contentContainerStyle={styles.content}>
                <Button iconLeft block primary large onPress={() => navigation.navigate('ProcessCalculator')}>
                    <Icon name='calculator'/>
                    <Text>{i18n.t('new')}</Text>
                </Button>
            </Content>
        </Layout>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'space-around',
        alignSelf: 'center',
        width: '80%',
        marginVertical: Dimensions.get('window').height / 4,
    }
});
