import React from 'react';
import AppHeader from "./AppHeader";
import {Container, Content} from "native-base";
import AppFooter from "./AppFooter";

export default function Layout({title, navigation, children}) {
    return (
        <Container>
            <AppHeader title={title} />
            <Content>{children}</Content>
            <AppFooter title={title} navigation={navigation} />
        </Container>
    );
}
