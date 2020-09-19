import React, { useEffect, useState } from 'react';

import { Text, List, ListItem, Icon, Content, Button, Badge, Left, Body, Right } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';
import barcodeConstants from "../../store/constants/barcode.constant";
import { saveProduct } from "../../store/actions/barcode.action";
import Layout from "../Layout";
import { StyleSheet, Vibration, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ProcessCalculator({ route, navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showScanner, setShowScanner] = useState(true);
    const [purchasedProducts, setPurchasedProducts] = useState([]);
    const [amountToScan, setAmountToScan] = useState(1);

    const dispatch = useDispatch();
    const products = useSelector(state => state.barcode.products);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        Vibration.vibrate();
        setScanned(true);
        setAmountToScan(1);

        //Pauses the scan reading for one sec.
        setTimeout(() => {
            setScanned(false);
        }, 1000);

        //Merge new product into purchase.
        const purchasedProduct = products.filter(product => product.barcode === data).pop();
        let purchasedProductsCopy = purchasedProducts.map(product => ({ ...product }));
        const productIndex = purchasedProducts.findIndex(product => product.barcode === purchasedProduct.barcode);

        if (productIndex >= 0) {
            purchasedProductsCopy[productIndex] = {...purchasedProductsCopy[productIndex], amount: purchasedProductsCopy[productIndex].amount + amountToScan};
        } else {
            purchasedProductsCopy.push({...purchasedProduct, amount: amountToScan});
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
                    <View style={styles.buttonContainer}>
                        <Button success small style={styles.button} onPress={() => setAmountToScan(prev => prev + 1)}>
                            <Icon name='arrow-up' />
                        </Button>
                        <Badge style={styles.badge}>
                            <Text>{amountToScan}</Text>
                        </Badge>
                        <Button success small style={styles.button} onPress={() => setAmountToScan(prev => prev > 1 ? prev - 1 : prev)}>
                            <Icon name='arrow-down' />
                        </Button>
                    </View>
                    <Button success rounded large style={styles.checkButton} onPress={endCalculationHandler}>
                        <Icon name='checkmark' />
                    </Button>
                </Content> :
                <Content contentContainerStyle={styles.contentList}>
                    <List>
                        <ListItem itemDivider>
                            <Left style={{flex: 1}}><Text>TOTAL</Text></Left>
                            <Body></Body>
                            <Right style={{flex: 1}}>
                                <Text>
                                    {
                                        purchasedProducts
                                            .reduce((prev, curr) => prev + (curr.amount * curr.price), 0)
                                            .toLocaleString('de-DE')
                                    }
                                </Text>
                            </Right>
                        </ListItem>
                        {purchasedProducts.map(product => (
                            <ListItem icon key={product.barcode}>
                                <Left>
                                    <Badge style={{backgroundColor: '#FF9501', alignSelf: 'center'}}>
                                        <Text>{product.amount}</Text>
                                    </Badge>
                                </Left>
                                <Body>
                                    <Text>{product.name}</Text>
                                </Body>
                                <Right>
                                    <Text>{parseFloat(product.price).toLocaleString('de-DE') }</Text>
                                </Right>
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
        marginBottom: 30,
        alignSelf: 'flex-end',
        padding: 10,
    },
    buttonContainer: {
        alignSelf: 'flex-end',
        marginRight: 50,
        marginTop: 30,
        flex: 1,
    },
    button: {
        paddingVertical: 5,
    },
    badge: {
        height: 40,
        width: 40,
        marginVertical: 10,
        alignSelf: 'center'
    },
});
