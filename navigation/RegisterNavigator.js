import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";

import RegisterScreen from '../screens/RegisterScreen';

const RegisterNavigator = createStackNavigator({
    Register: {
        screen: RegisterScreen,
        navigationOptions: {headerShown: false}
    },
});

export default createAppContainer(RegisterNavigator);
