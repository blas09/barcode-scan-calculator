import React from 'react';
import AppHeader from "./AppHeader";
import {Container} from "native-base";
import AppFooter from "./AppFooter";

export default function Layout({title, navigation, children}) {
    return (
        <Container>
            <AppHeader title={title}/>
            {children}
            <AppFooter title={title} navigation={navigation}/>
        </Container>
    );
}
