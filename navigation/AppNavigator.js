import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import ProductsScreen from "../screens/Products/ProductsScreen";
import AccountScreen from "../screens/AccountScreen";
import NewProductsScreen from "../screens/Products/NewProductsScreen";

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
    NewProduct: {
        screen: NewProductsScreen,
        navigationOptions: { headerShown: false }
    }
});

export default createAppContainer(AppNavigator);
