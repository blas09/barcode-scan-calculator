import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const AppNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: { headerShown: false }
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: { headerShown: false }
    },
});

export default createAppContainer(AppNavigator);
