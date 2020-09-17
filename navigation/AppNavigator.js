import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
});

export default createAppContainer(AppNavigator);
