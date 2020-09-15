import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('barcode_scan_calculator.db');

export const init = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS users (id VARCHAR(32) NOT NULL UNIQUE, name VARCHAR(255))',
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};
