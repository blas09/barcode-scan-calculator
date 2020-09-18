import React  from 'react';

import Layout from "../Layout";
import barcodeConstants from '../../store/constants/barcode.constant';
import {Button, Content, Icon, Text} from "native-base";
import {Dimensions, StyleSheet} from "react-native";

export default function CalculatorMenu({navigation}) {
    return (
        <Layout title={barcodeConstants.HOME_TITLE} navigation={navigation}>
            <Content contentContainerStyle={styles.content}>
                <Button iconLeft block primary large onPress={() => navigation.navigate('ProcessCalculator')}>
                    <Icon name='calculator' />
                    <Text>New</Text>
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
