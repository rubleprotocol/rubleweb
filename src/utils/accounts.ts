import { byteArray2hexStr } from './bytes.js';
import { getBase58CheckAddress, genPriKey, getAddressFromPriKey, getPubKeyFromPriKey, pkToAddress } from './crypto.js';
import { ethersWallet, ethersHDNodeWallet, Mnemonic, Wordlist } from './ethersUtils.js';
import { TRON_BIP39_PATH_INDEX_0 } from './address.js';

const INVALID_TRON_PATH_ERROR_MSG = 'Invalid tron path provided';

export function generateAccount() {
    const priKeyBytes = genPriKey();
    const pubKeyBytes = getPubKeyFromPriKey(priKeyBytes);
    const addressBytes = getAddressFromPriKey(priKeyBytes);

    const privateKey = byteArray2hexStr(priKeyBytes);
    const publicKey = byteArray2hexStr(pubKeyBytes);

    return {
        privateKey,
        publicKey,
        address: {
            base58: getBase58CheckAddress(addressBytes),
            hex: byteArray2hexStr(addressBytes),
        },
    };
}

export function generateRandom() {
    const account = ethersWallet.createRandom();

    const result = {
        mnemonic: account.mnemonic,
        privateKey: account.privateKey,
        publicKey: account.signingKey.publicKey,
        address: pkToAddress(account.privateKey.replace(/^0x/, '')),
    };

    return result;
}

export function generateAccountWithMnemonic(mnemonic: string, path?: string, wordlist: Wordlist | null = null) {
    if (!path) {
        path = TRON_BIP39_PATH_INDEX_0;
    }
    if (!String(path).match(/^m\/44\'\/195\'/)) {
        throw new Error(INVALID_TRON_PATH_ERROR_MSG);
    }
    const account = ethersHDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(mnemonic, path, wordlist));

    const result = {
        mnemonic: account.mnemonic,
        privateKey: account.privateKey,
        publicKey: account.signingKey.publicKey,
        address: pkToAddress(account.privateKey.replace(/^0x/, '')),
    };

    return result;
}