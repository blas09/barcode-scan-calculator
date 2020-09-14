import React from 'react';

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import {Container, Text} from "native-base";

export default function Main() {
    return (
        <Container>
            <AppHeader />
            <Text>Main Page</Text>
            <AppFooter />
        </Container>
    );
};
