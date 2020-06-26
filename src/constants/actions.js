export default {
    send: {
        title: 'main.send',
        type: 'transfer',
        value: 'send',
        module: 'bank',
    },
    delegate: {
        title: 'staking.delegate',
        type: 'delegate',
        value: 'delegate',
        module: 'staking',
    },
    begin_redelegate: {
        title: 'staking.redelegate',
        type: 'redelegate',
        value: 'begin_redelegate',
        module: 'staking',
    },
    begin_unbonding: {
        title: 'staking.unbond',
        type: 'unbond',
        value: 'begin_unbonding',
        module: 'staking',
    },
    withdraw_delegator_reward: {
        title: 'distribution.withdraw',
        type: 'withdraw_rewards',
        value: 'withdraw_delegator_reward',
        module: 'distribution',
    },
    withdraw_validator_commission: {
        title: 'distribution.withdraw_validator_rewards',
        type: 'message',
        value: 'withdraw_validator_commission',
        module: 'distribution',
    },
    unjail: {
        title: 'slashing.unjail',
        type: 'message',
        value: 'unjail',
        module: 'slashing',
    },
    submit_proposal: {
        title: 'gov.submit',
        type: 'submit_proposal',
        value: 'submit_proposal',
        module: 'governance',
    },
    deposit: {
        title: 'gov.deposit',
        type: 'proposal_deposit',
        value: 'deposit',
        module: 'governance',
    },
    vote: {
        title: 'gov.vote',
        type: 'proposal_vote',
        value: 'vote',
        module: 'governance',
    },
    issue_create: {
        title: 'issues.issue',
        type: 'issue',
        value: 'issue',
        module: 'issue',
    },
    transfer: {
        title: 'issues.transfer',
        type: 'transfer',
        value: 'issue',
        module: 'issue',
    },
    approve: {
        title: 'issues.approve',
        type: 'approve',
        value: 'issue',
        module: 'issue',
    },
    transfer_from: {
        title: 'issues.transfer_from',
        type: 'transfer_from',
        value: 'issue',
        module: 'issue',
    },
    mint: {
        title: 'issues.mint',
        type: 'mint',
        value: 'issue',
        module: 'issue',
    },
    burn: {
        title: 'issues.burn',
        type: 'burn',
        value: 'issue',
        module: 'issue',
    },
    burn_from: {
        title: 'issues.burn_from',
        type: 'burn_from',
        value: 'issue',
        module: 'issue',
    },
    freeze: {
        title: 'issues.freeze',
        type: 'freeze',
        value: 'issue',
        module: 'issue',
    },
    unfreeze: {
        title: 'issues.unfreeze',
        type: 'unfreeze',
        value: 'issue',
        module: 'issue',
    },
    transfer_ownership: {
        title: 'issues.transfer_ownership',
        type: 'transfer_ownership',
        value: 'issue',
        module: 'issue',
    },
};
