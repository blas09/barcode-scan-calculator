import React  from 'react';

import {Footer, FooterTab, Button, Text, Icon} from 'native-base';
import barcodeConstants from '../store/constants/barcode.constant';

export default function AppFooter({title, navigation}) {
    const isProductSectionActive = title === barcodeConstants.PRODUCTS_TITLE || title === barcodeConstants.NEW_PRODUCT_TITLE;

    return (
        <Footer>
            <FooterTab>
                <Button active={title === barcodeConstants.HOME_TITLE} vertical onPress={() => navigation.navigate('Calculator')}>
                    <Icon active={title === barcodeConstants.HOME_TITLE} name="calculator" />
                    <Text>Calculator</Text>
                </Button>
                <Button active={isProductSectionActive} vertical onPress={() => navigation.navigate('Products')}>
                    <Icon active={isProductSectionActive} name="cart" />
                    <Text>Products</Text>
                </Button>
                <Button active={title === barcodeConstants.ACCOUNT_TITLE} vertical onPress={() => navigation.navigate('Account')}>
                    <Icon active={title === barcodeConstants.ACCOUNT_TITLE} name="person" />
                    <Text>Account</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
}
