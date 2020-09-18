import React  from 'react';

import Layout from "./Layout";
import barcodeConstants from "../store/constants/barcode.constant";

export default function Account({navigation}) {
    return <Layout title={barcodeConstants.ACCOUNT_TITLE} navigation={navigation} />;;
}
