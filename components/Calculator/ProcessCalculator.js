import React, { useEffect, useState } from 'react';

import { Text, List, ListItem, Icon, Content, Button } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';
import barcodeConstants from "../../store/constants/barcode.constant";
import { saveProduct } from "../../store/actions/barcode.action";
import Layout from "../Layout";
import { StyleSheet, Vibration } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ProcessCalculator({ route, navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showScanner, setShowScanner] = useState(true);
    const [purchasedProducts, setPurchasedProducts] = useState([]);

    const dispatch = useDispatch();
    const products = useSelector(state => state.barcode.products);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        Vibration.vibrate();

        //Pauses the scan reading for one sec.
        setTimeout(() => {
            setScanned(false);
        }, 1000);

        //Merge new product into purchase.
        const purchasedProduct = products.filter(product => product.barcode === data).pop();
        let purchasedProductsCopy = purchasedProducts.map(product => ({ ...product }));
        const productIndex = purchasedProducts.findIndex(product => product.barcode === purchasedProduct.barcode);

        if (productIndex >= 0) {
            purchasedProductsCopy[productIndex] = {...purchasedProductsCopy[productIndex], amount: purchasedProductsCopy[productIndex].amount + 1};
        } else {
            purchasedProductsCopy.push({...purchasedProduct, amount: 1});
        }

        //save the new purchase state.
        setPurchasedProducts(purchasedProductsCopy);
    };

    const endCalculationHandler = () => {
        setShowScanner(false);
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <Layout navigation={navigation} title={barcodeConstants.HOME_TITLE}>
            {showScanner ?
                <Content contentContainerStyle={styles.content}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <Button success rounded large style={styles.checkButton} onPress={endCalculationHandler}>
                        <Icon name='checkmark' />
                    </Button>
                </Content> :
                <Content contentContainerStyle={styles.contentList}>
                    <List>
                        <ListItem itemDivider>
                            <Text>Purchased Products</Text>
                        </ListItem>
                        {purchasedProducts.map(product => (
                            <ListItem key={product.barcode}>
                                <Text>{product.name}</Text>
                                <Text>{product.name}</Text>
                                <Text>{product.name}</Text>
                            </ListItem>
                        ))}
                    </List>
                </Content>
            }
        </Layout>
    );
}

const styles = StyleSheet.create({
    form: {
        width: '80%',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    contentList: {
        flex: 1,
    },
    contentScanned: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkButton: {
        marginRight: 50,
        marginBottom: 50,
        alignSelf: 'flex-end',
        padding: 10,
    }
});
