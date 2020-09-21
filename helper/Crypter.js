import * as Crypto from "expo-crypto";

export async function runCrypto(pass) {
    return await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        pass
    );
}
