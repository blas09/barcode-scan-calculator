import React  from 'react';

import Layout from "./Layout";
import barcodeConstants from '../store/constants/barcode.constant';
import { Content, Text } from "native-base";
import { StyleSheet } from "react-native";

export default function Home({navigation}) {
    return (
        <Layout title={barcodeConstants.HOME_TITLE} navigation={navigation}>
            <Content contentContainerStyle={styles.content}>
                <Text>Calculator</Text>
            </Content>
        </Layout>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
