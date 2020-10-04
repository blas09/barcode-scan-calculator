import React from "react";
import {StyleSheet, Text} from "react-native";
import i18n from "i18n-js";
import {Button, Content, Form, Icon, Input, Item} from "native-base";
import {Controller, useForm} from "react-hook-form";
import Layout from "../Layout";
import {useDispatch} from "react-redux";
import {saveProduct} from "../../store/actions/barcode.action";

export default function NotFoundProductModal({barcode, onClose, navigation}) {
    const {control, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const onSubmit = ({name, price}) => {
        const productNotFound = {barcode, name, price};

        dispatch(saveProduct(productNotFound));
        onClose(productNotFound);
    }

    return (
        <Layout title={i18n.t('product_not_found')} navigation={navigation}>
            <Content contentContainerStyle={styles.content}>
                <Form style={styles.form}>
                    <Item style={styles.item} regular error={errors.name && errors.name.message !== ''}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <Input
                                    placeholder={i18n.t('name')}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    autoCorrect={false}
                                />
                            )}
                            name="name"
                            defaultValue="Producto no encontrado"
                        />
                        {errors.name && <Icon name='close-circle'/>}
                    </Item>

                    <Item style={styles.item} regular error={errors.price && errors.price.message !== ''}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <Input
                                    placeholder={i18n.t('price')}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType="number-pad"
                                />
                            )}
                            name="price"
                            rules={{required: i18n.t('rules.not_empty')}}
                            defaultValue=""
                        />
                        {errors.price && <Icon name='close-circle'/>}
                    </Item>

                    <Button style={styles.submitBtn} block onPress={handleSubmit(onSubmit)}>
                        <Text>{i18n.t('save')}</Text>
                    </Button>
                </Form>
            </Content>
        </Layout>
    );
};

const styles = StyleSheet.create({
    form: {
        width: '80%',
        alignSelf: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    item: {
        marginBottom: 10,
    },
    submitBtn: {
        marginVertical: 20,
    },
    contentList: {
        flex: 1,
    },
});
