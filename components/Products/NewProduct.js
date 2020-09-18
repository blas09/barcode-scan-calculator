import React, { useEffect, useState } from 'react';

import {Text, Button, View, Content, Item, Input, Form, Label } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';
import barcodeConstants from "../../store/constants/barcode.constant";
import { saveProduct } from "../../store/actions/barcode.action";
import Layout from "../Layout";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function NewProduct({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const dispatch = useDispatch();
    const products = useSelector(state => state.barcode.products);

    //Product attributes
    const [barcode, setBarcode] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        const product = products.filter(storedProduct => storedProduct.barcode === data);
        if (product.length === 1) {
            setName(product[0].name);
            setPrice(product[0].price);
        }

        setBarcode(data);
        setScanned(true);
    };

    const onSaveHandler = () => {
        dispatch(saveProduct({ barcode, name, price }));
        navigation.navigate('Products');
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <Layout title={barcodeConstants.NEW_PRODUCT_TITLE} navigation={navigation}>
            <Content contentContainerStyle={scanned ? styles.contentScanned : styles.content}>
                {!scanned ?
                    <View style={{flex: 1}}>
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={StyleSheet.absoluteFillObject}
                        />
                    </View> :
                    <Form style={styles.form}>
                        <Item style={styles.item} stackedLabel>
                            <Label>Barcode</Label>
                            <Input
                                disabled
                                value={barcode}
                            />
                        </Item>

                        <Item style={styles.item} stackedLabel>
                            <Label>Name</Label>
                            <Input
                                value={name}
                                onChangeText={name => setName(name)}
                                autoCorrect={false}
                            />
                        </Item>

                        <Item style={styles.item} stackedLabel>
                            <Label>Price</Label>
                            <Input
                                value={price}
                                onChangeText={price => setPrice(price)}
                                keyboardType="number-pad"
                            />
                        </Item>

                        <Button block onPress={onSaveHandler}>
                            <Text>Save</Text>
                        </Button>
                    </Form>
                }
            </Content>
        </Layout>
    );
}

const styles = StyleSheet.create({
    form: {
        width: '80%',
    },
    content: {
        flex: 1,
    },
    contentScanned: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        marginBottom: 10,
    },
});
