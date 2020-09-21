import React, { useState } from 'react';

import { Text, Button, View, Content, Item, Input, Form, Label, Icon } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';
import barcodeConstants from "../../store/constants/barcode.constant";
import { saveProduct } from "../../store/actions/barcode.action";
import Layout from "../Layout";
import { StyleSheet, Vibration } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

export default function ProcessProduct({ route, navigation }) {
    const [scanned, setScanned] = useState(false);
    const hasCameraPermission = useSelector(state => state.auth.hasCameraPermission);
    const products = useSelector(state => state.barcode.products);
    const { control, handleSubmit, errors, setValue, trigger } = useForm();
    const dispatch = useDispatch();

    const readOnly = navigation.getParam('readOnly') || false;

    //Product attributes
    const [barcode, setBarcode] = useState('');

    const onSubmit = ({ name, price }) => {
        dispatch(saveProduct({ barcode, name, price }));
        navigation.navigate('Products');
    }

    const handleBarCodeScanned = ({ type, data }) => {
        const product = products.filter(storedProduct => storedProduct.barcode === data);
        if (product.length === 1) {
            trigger()
                .then(res => {
                    setValue('name', product[0].name);
                    setValue('price', product[0].price);
                });
        }

        setBarcode(data);
        setScanned(true);
        Vibration.vibrate();
    };

    if (hasCameraPermission === null) {
        return (
            <View style={{flex: 1, width: '80%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                <Text>No access to camera.</Text>
                <Text>Give this app access to your camera.</Text>
            </View>
        );
    }

    return (
        <Layout title={!readOnly ? barcodeConstants.NEW_PRODUCT_TITLE : barcodeConstants.FIND_PRODUCT_TITLE} navigation={navigation}>
            <Content contentContainerStyle={scanned ? styles.contentScanned : styles.content}>
                {!scanned ?
                    <View style={{flex: 1}}>
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={StyleSheet.absoluteFillObject}
                        />
                    </View> :
                    <Form style={styles.form}>
                        <Item style={styles.item} regular error={errors.name && errors.name.message !== ''}>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                    <Input
                                        placeholder="Name"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                        autoCorrect={false}
                                        disabled={readOnly}
                                    />
                                )}
                                name="name"
                                rules={{ required: 'This field cannot be empty.' }}
                                defaultValue=""
                            />
                            {errors.name && <Icon name='close-circle' />}
                        </Item>

                        <Item style={styles.item} regular error={errors.price && errors.price.message !== ''}>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                    <Input
                                        placeholder="Price"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                        keyboardType="number-pad"
                                        disabled={readOnly}
                                    />
                                )}
                                name="price"
                                rules={{ required: 'This field cannot be empty.' }}
                                defaultValue=""
                            />
                            {errors.price && <Icon name='close-circle' />}
                        </Item>

                        {!readOnly ?
                            <Button style={styles.submitBtn} block onPress={handleSubmit(onSubmit)}>
                                <Text>Save</Text>
                            </Button> :
                            null
                        }
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
    submitBtn: {
        marginVertical: 20,
    }
});
