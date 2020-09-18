import React  from 'react';
import { Container, Content } from 'native-base';
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

export default function Products() {
    return (
        <Container>
            <AppHeader title="Calculator" />
            <Content />
            <AppFooter />
        </Container>
    );
}
