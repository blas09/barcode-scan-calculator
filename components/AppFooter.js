import React  from 'react';

import {Footer, FooterTab, Button, Text, Icon} from 'native-base';

export default function AppFooter() {
    return (
        <Footer>
            <FooterTab>
                <Button vertical active>
                    <Icon active name="calculator" />
                    <Text>Calculator</Text>
                </Button>
                <Button vertical>
                    <Icon name="cart" />
                    <Text>Products</Text>
                </Button>
                <Button vertical>
                    <Icon name="person" />
                    <Text>Account</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
}
