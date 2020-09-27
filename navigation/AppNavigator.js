import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";

import CalculatorScreen from "../screens/Calculator/CalculatorScreen";
import ProductsMenuScreen from "../screens/Products/ProductsMenuScreen";
import AccountScreen from "../screens/AccountScreen";
import ProcessProductScreen from "../screens/Products/ProcessProductScreen";
import ProcessCalculatorScreen from "../screens/Calculator/ProcessCalculatorScreen";

const AppNavigator = createStackNavigator({
    Calculator: {
        screen: CalculatorScreen,
        navigationOptions: {headerShown: false}
    },
    Products: {
        screen: ProductsMenuScreen,
        navigationOptions: {headerShown: false}
    },
    Account: {
        screen: AccountScreen,
        navigationOptions: {headerShown: false}
    },
    ProcessProduct: {
        screen: ProcessProductScreen,
        navigationOptions: {headerShown: false}
    },
    ProcessCalculator: {
        screen: ProcessCalculatorScreen,
        navigationOptions: {headerShown: false}
    }
});

export default createAppContainer(AppNavigator);
