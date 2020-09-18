import React  from 'react';

import Layout from "./Layout";
import barcodeConstants from '../store/constants/barcode.constant';

export default function Products({navigation}) {
    return <Layout title={barcodeConstants.PRODUCTS_TITLE} navigation={navigation} />;;
}
