import React, {useState} from 'react';

import {Text, List, ListItem, Icon, Content, Button, Badge, Left, Body, Right} from 'native-base';
import {BarCodeScanner} from 'expo-barcode-scanner';
import Layout from "../Layout";
import {StyleSheet, Vibration, View, ScrollView} from "react-native";
import {useSelector} from "react-redux";
import {useKeepAwake} from "expo-keep-awake";
import i18n from 'i18n-js';
import NotFoundProductModal from "../Products/NotFoundProductModal";

export default function ProcessCalculator({route, navigation}) {
    useKeepAwake();

    const [scanned, setScanned] = useState(false);
    const [showScanner, setShowScanner] = useState(true);
    const [purchasedProducts, setPurchasedProducts] = useState([]);
    const [amountToScan, setAmountToScan] = useState(1);
    const [scannedProductNotFound, setScannedProductNotFound] = useState(false);
    const [notFoundProductBarcode, setNotFoundProductBarcode] = useState('');
    const [notFoundProductAmount, setNotFoundProductAmount] = useState(0);

    const products = useSelector(state => state.barcode.products);
    const hasCameraPermission = useSelector(state => state.auth.hasCameraPermission);

    const handleBarCodeScanned = ({type, data}) => {
        Vibration.vibrate();
        setScanned(true);
        setAmountToScan(1);

        //Pauses the scan reading for one sec.
        setTimeout(() => {
            setScanned(false);
        }, 1000);

        //Merge new product into purchase.
        const purchasedProduct = products.filter(product => product.barcode === data).pop();

        //Scanned product not found
        if ('undefined' === typeof purchasedProduct) {
            setNotFoundProductBarcode(data);
            setNotFoundProductAmount(amountToScan);
            setScannedProductNotFound(true);
            setShowScanner(false);

            return;
        }

        let purchasedProductsCopy = purchasedProducts.map(product => ({...product}));
        const productIndex = purchasedProducts.findIndex(product => product.barcode === purchasedProduct.barcode);

        if (productIndex >= 0) {
            purchasedProductsCopy[productIndex] = {
                ...purchasedProductsCopy[productIndex],
                amount: purchasedProductsCopy[productIndex].amount + amountToScan
            };
        } else {
            purchasedProductsCopy.push({...purchasedProduct, amount: amountToScan});
        }

        //Save the new purchase state.
        setPurchasedProducts(purchasedProductsCopy);
    };

    //Add not found product after it was saved.
    const processNotFoundProduct = productNotFound => {
        let purchasedProductsCopy = purchasedProducts.map(product => ({...product}));
        purchasedProductsCopy.push({...productNotFound, amount: notFoundProductAmount});

        setPurchasedProducts(purchasedProductsCopy);
        setScannedProductNotFound(false);
        setShowScanner(true);
    }

    const endCalculationHandler = () => {
        setShowScanner(false);
    }

    if (hasCameraPermission === false) {
        return (
            <View style={{flex: 1, width: '80%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                <Text>{i18n.t('camera_no_access')}</Text>
                <Text>{i18n.t('camera_give_access')}</Text>
            </View>
        );
    }

    if (scannedProductNotFound) {
        return <NotFoundProductModal
            barcode={notFoundProductBarcode}
            onClose={processNotFoundProduct}
            navigation={navigation}
        />;
    }

    return (
        <Layout navigation={navigation} title={i18n.t('home_title')}>
            {showScanner ?
                <Content contentContainerStyle={styles.content}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <View style={styles.buttonContainer}>
                        <Button success small style={styles.button} onPress={() => setAmountToScan(prev => prev + 1)}>
                            <Icon name='arrow-up'/>
                        </Button>
                        <Badge style={styles.badge}>
                            <Text>{amountToScan}</Text>
                        </Badge>
                        <Button success small style={styles.button}
                                onPress={() => setAmountToScan(prev => prev > 1 ? prev - 1 : prev)}>
                            <Icon name='arrow-down'/>
                        </Button>
                    </View>
                    <Button success rounded large style={styles.checkButton} onPress={endCalculationHandler}>
                        <Icon name='checkmark'/>
                    </Button>
                </Content> :
                <Content contentContainerStyle={styles.contentList}>
                    <List>
                        <ListItem itemDivider>
                            <Left style={{flex: 1}}><Text>{i18n.t('total')}</Text></Left>
                            <Body></Body>
                            <Right style={{flex: 1, marginRight: 6}}>
                                <Text>
                                    {
                                        purchasedProducts
                                            .reduce((prev, curr) => prev + (curr.amount * curr.price), 0)
                                            .toLocaleString('de-DE')
                                    }
                                </Text>
                            </Right>
                        </ListItem>
                        <ScrollView>
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
                                        <Text>{parseFloat(product.price).toLocaleString('de-DE')}</Text>
                                    </Right>
                                </ListItem>
                            ))}
                        </ScrollView>
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
