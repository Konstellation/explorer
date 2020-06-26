import sdk from 'cosmosjs';

export default sdk.network({
    apiUrl: 'http://node1.konstellation.tech:1317',
    nodeUrl: 'http://node1.konstellation.tech:26657',
    chainId: 'darchub',
});
