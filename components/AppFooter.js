import React, { useState } from 'react';

import { Footer, FooterTab, Button, Text } from 'native-base';

export default function AppFooter() {
    return (
        <Footer>
            <FooterTab>
                <Button full>
                    <Text>Footer</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
}
