import React, { useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";

import AppNavigator from "./AppNavigator";
import RegisterNavigator from "./RegisterNavigator";
import AuthNavigator from "./AuthNavigator";
import { AppState } from "react-native";
import { logout } from "../store/actions/auth.action";

const Router = () => {
    const appInitiated = useSelector(state => state.barcode.initiated);
    const logged = useSelector(state => state.auth.logged);
    const dispatch = useDispatch();

    useEffect(() => {
        AppState.addEventListener("change", handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", handleAppStateChange);
        };
    }, []);

    const handleAppStateChange = nextAppState => {
        if (nextAppState.match(/inactive|background/)) {
            dispatch(logout());
        }
    };

    let elem = <AuthNavigator />;
    if (!appInitiated) {
        elem = <RegisterNavigator />;
    } else if (logged) {
        elem = <AppNavigator />;
    }

    return elem;
}

export default Router;
