import React from 'react';

import { useSelector } from "react-redux";

import AppNavigator from "./AppNavigator";
import RegisterNavigator from "./RegisterNavigator";
import AuthNavigator from "./AuthNavigator";

const Router = () => {
    const appInitiated = useSelector(state => state.barcode.initiated);
    const user = useSelector(state => state.barcode.user);

    let elem = <AuthNavigator />;
    if (!appInitiated) {
        elem = <RegisterNavigator />;
    } else if (user && user.token) {
        elem = <AppNavigator />;
    }

    return elem;
}

export default Router;
