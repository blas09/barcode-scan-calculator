import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import ProductsScreen from "../screens/ProductsScreen";
import AccountScreen from "../screens/AccountScreen";

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: { headerShown: false }
    },
    Products: {
        screen: ProductsScreen,
        navigationOptions: { headerShown: false }
    },
    Account: {
        screen: AccountScreen,
        navigationOptions: { headerShown: false }
    },
});

export default createAppContainer(AppNavigator);
