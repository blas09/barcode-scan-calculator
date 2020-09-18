import React  from 'react';

import Layout from "../Layout";
import barcodeConstants from '../../store/constants/barcode.constant';
import { StyleSheet, Dimensions } from 'react-native';
import { Content, Button, Icon, Text } from 'native-base';

export default function ProductsMenu({navigation}) {
    return (
        <Layout title={barcodeConstants.PRODUCTS_TITLE} navigation={navigation}>
            <Content contentContainerStyle={styles.content}>
                <Button iconLeft block primary large onPress={() => navigation.navigate('ProcessProduct')}>
                    <Icon name='save' />
                    <Text>New Product</Text>
                </Button>
                <Button iconLeft block primary large onPress={() => navigation.navigate('ProcessProduct', { readOnly: true })}>
                    <Icon name='search' />
                    <Text>Find Product</Text>
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
