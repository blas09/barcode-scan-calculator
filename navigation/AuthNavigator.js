import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";

import LoginScreen from '../screens/LoginScreen';

const AuthNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {headerShown: false}
    },
});

export default createAppContainer(AuthNavigator);
