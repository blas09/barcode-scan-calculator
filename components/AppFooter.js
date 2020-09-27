import React from 'react';

import {Footer, FooterTab, Button, Text, Icon} from 'native-base';
import i18n from 'i18n-js';

export default function AppFooter({title, navigation}) {
    const isProductSectionActive =
        title === i18n.t('products_title') ||
        title === i18n.t('new_product_title') ||
        title === i18n.t('find_product_title');

    return (
        <Footer>
            <FooterTab>
                <Button active={title === i18n.t('home_title')} vertical
                        onPress={() => navigation.navigate('Calculator')}>
                    <Icon active={title === i18n.t('home_title')} name="calculator"/>
                    <Text>{i18n.t('home_title')}</Text>
                </Button>
                <Button active={isProductSectionActive} vertical onPress={() => navigation.navigate('Products')}>
                    <Icon active={isProductSectionActive} name="cart"/>
                    <Text>{i18n.t('products_title')}</Text>
                </Button>
                <Button active={title === i18n.t('account_title')} vertical
                        onPress={() => navigation.navigate('Account')}>
                    <Icon active={title === i18n.t('account_title')} name="person"/>
                    <Text>{i18n.t('account_title')}</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
}
