import React  from 'react';

import Layout from "./Layout";
import barcodeConstants from '../store/constants/barcode.constant';

export default function Home({navigation}) {
    return <Layout title={barcodeConstants.HOME_TITLE} navigation={navigation} />;
}
