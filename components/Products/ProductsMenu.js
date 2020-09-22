import React  from 'react';

import Layout from "../Layout";
import { StyleSheet, Dimensions } from 'react-native';
import { Content, Button, Icon, Text } from 'native-base';
import i18n from 'i18n-js';

export default function ProductsMenu({navigation}) {
    return (
        <Layout title={i18n.t('products_title')} navigation={navigation}>
            <Content contentContainerStyle={styles.content}>
                <Button iconLeft block primary large onPress={() => navigation.navigate('ProcessProduct')}>
                    <Icon name='save' />
                    <Text>{i18n.t('new_product')}</Text>
                </Button>
                <Button iconLeft block primary large onPress={() => navigation.navigate('ProcessProduct', { readOnly: true })}>
                    <Icon name='search' />
                    <Text>{i18n.t('find_product')}</Text>
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
