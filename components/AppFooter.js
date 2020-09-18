import React  from 'react';

import {Footer, FooterTab, Button, Text, Icon} from 'native-base';
import barcodeConstants from '../store/constants/barcode.constant';

export default function AppFooter({title, navigation}) {
    return (
        <Footer>
            <FooterTab>
                <Button active={title === barcodeConstants.HOME_TITLE} vertical onPress={() => navigation.navigate('Home')}>
                    <Icon active={title === barcodeConstants.HOME_TITLE} name="calculator" />
                    <Text>Calculator</Text>
                </Button>
                <Button active={title === barcodeConstants.PRODUCTS_TITLE} vertical onPress={() => navigation.navigate('Products')}>
                    <Icon active={title === barcodeConstants.PRODUCTS_TITLE} name="cart" />
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
