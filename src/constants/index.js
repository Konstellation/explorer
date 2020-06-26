import {
    DEFAULT_DENOM,
    DEFAULT_KEY_PATH,
    DEFAULT_FEE,
    DEFAULT_GAS,
    DEFAULT_BECH32_PREFIX,
} from 'cosmosjs/src/constants';
import {en} from './lang';
import {menu} from './menu';
import {txTypes} from './txTypes';
import {txListFieldsMap} from './txListFieldsMap';
import {txFieldsMap} from './txFieldsMap';

const apiDomain = 'http://127.0.0.1:1317/';
const baseURL = `${apiDomain}`;
const explorerDomain = 'http://127.0.0.1:8080/';

export {
    en,
    explorerDomain,
    baseURL,
    txFieldsMap,
    DEFAULT_DENOM,
    DEFAULT_BECH32_PREFIX,
    DEFAULT_KEY_PATH,
    DEFAULT_GAS,
    DEFAULT_FEE,
    menu,
    txTypes,
    txListFieldsMap,
};
