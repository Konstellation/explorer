import moment from 'dayjs';
import Big from 'big.js';
import _ from 'lodash';
import numeral from 'numeral';
import {DEFAULT_DENOM, DEFAULT_FEE, DEFAULT_GAS} from '../constants';

export const upper = s => s.toUpperCase();

export const formatTime = (time) => {
    if (time && time.length === 10) {
        return moment.unix(time)
            .format('YYYY-MM-DD HH:mm:ss');
    }
    return moment(time)
        .format('YYYY-MM-DD HH:mm:ss');
};


export const addr = s => s && `${s.slice(0, 8)}......${s.slice(s.length - 8)}`;

export const toToken = amount => (_.isObject(amount) ? amount : {
    amount,
    denom: DEFAULT_DENOM,
});

export const formatAmount = coins => {
    let token;

    if (coins && _.isArray(coins)) {
        [token] = coins;
    } else if (coins && _.isObject(coins)) {
        token = coins;
    }

    !token || !token.amount ? token = {
        denom: DEFAULT_DENOM,
        amount: 0,
    } : '';

    return `${numeral(token.amount)
        .format('0,0.[0000]')} ${token.denom.toUpperCase()}`;
};

export const formatFee = fee => {
    if (_.isEmpty(fee)) {
        return `${DEFAULT_FEE} ${DEFAULT_DENOM.toUpperCase()}`;
    }

    const [{amount, denom}] = !_.isArray(fee) ? [fee] : fee;

    return `${amount} ${denom.toUpperCase()}`;
};

export const formatGas = gas => {
    if (_.isEmpty(gas)) {
        return `0 | ${DEFAULT_GAS}`;
    }

    const {used, wanted} = gas;

    return `${used} | ${wanted}`;
};

export const formatDenom = denom => denom.toUpperCase();

export const formatDARC = (darc) => {
    const n = Big(darc)
        .div(Math.pow(10, 6));
    return numeral(n.toString())
        .format('0,0.[0000]');
};

// export const formatTime = time => time && time.match(/\d{10}/) ? moment.unix(time).format('YYYY-MM-DD HH:mm:ss') : moment(time).format('YYYY-MM-DD HH:mm:ss');

export const formatNumber = v => (v ? numeral(v.toString())
    .format('0,0.[0000]') : 0);

export const formatPercents = p => (p ? numeral(p.toString())
    .format('(0.[00]%)') : 0);

export const formatWithdraw = w => [{
    amount: w.match(/\d+/)[0],
    denom: w.match(/\D+/)[0],
}];
