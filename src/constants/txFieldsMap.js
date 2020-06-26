import {
    txListFieldsMap,
} from './txListFieldsMap';

const defaultFields = [{
    name: 'Action',
    field: 'tags.0.value',
    linkType: '',
},
    {
        name: 'Gas Used',
        field: 'gas_used',
        linkType: '',
    },
    {
        name: 'Memo',
        field: 'tx.value.memo',
        linkType: '',
    },
];

export const txFieldsMap = {
    // bank
    send_bank: [
        ...txListFieldsMap.send,
        ...defaultFields,
        {
            name: 'Amount',
            field: 'tx.value.msg.0.value.amount',
            linkType: '',
        },
    ],
    multisend_bank: [...txListFieldsMap.multisend, ...defaultFields],

    // staking
    delegate_staking: [...txListFieldsMap.delegate, ...defaultFields],
    begin_redelegate_staking: [
        ...txListFieldsMap.begin_redelegate,
        ...defaultFields,
        {
            name: 'End Time',
            field: 'tags.5.value',
            linkType: '',
        },
    ],
    begin_unbonding_staking: [
        ...txListFieldsMap.begin_unbonding,
        ...defaultFields,
        {
            name: 'End Time',
            field: 'tags.4.value',
            linkType: '',
        },
    ],
    create_validator_staking: [
        ...txListFieldsMap.create_validator,
        ...defaultFields,
        {
            name: 'Commission Rate',
            field: 'tx.value.msg.0.value.commission',
            linkType: '',
        },
        {
            name: 'Min Self Delegation',
            field: 'tx.value.msg.0.value.min_self_delegation',
            linkType: '',
        },
        {
            name: 'Description',
            field: 'tx.value.msg.0.value.description',
            linkType: '',
        },
    ],
    edit_validator_staking: [
        ...txListFieldsMap.edit_validator,
        ...defaultFields,
        {
            name: 'Identity',
            field: 'tx.value.msg.0.value.Description.identity',
            linkType: '',
        },
        {
            name: 'Website',
            field: 'tx.value.msg.0.value.Description.website',
            linkType: '',
        },
        {
            name: 'Details',
            field: 'tx.value.msg.0.value.Description.details',
            linkType: '',
        },
        {
            name: 'Commission Rate',
            field: 'tx.value.msg.0.value.commission_rate',
            linkType: '',
        },
        {
            name: 'Min Self Delegation',
            field: 'tx.value.msg.0.value.min_self_delegation',
            linkType: '',
        },
    ],

    // slashing
    unjail_slashing: [...txListFieldsMap.unjail, ...defaultFields],

    // distribution
    set_withdraw_address_distribution: [...txListFieldsMap.set_withdraw_address, ...defaultFields],
    withdraw_delegator_reward_distribution: [
        ...txListFieldsMap.withdraw_delegator_reward,
        ...defaultFields,
    ],
    withdraw_validator_rewards_all_distribution: [
        ...txListFieldsMap.withdraw_validator_rewards_all,
        ...defaultFields,
    ],

    // gov
    submit_proposal_governance: [
        ...txListFieldsMap.submit_proposal,
        ...defaultFields,
        {
            name: 'Description',
            field: 'tx.value.msg.0.value.description',
            linkType: '',
        },
        {
            name: 'Initial Deposit',
            field: 'tx.value.msg.0.value.initial_deposit',
            linkType: '',
        },
    ],
    deposit_governance: [...txListFieldsMap.deposit, ...defaultFields],
    vote_governance: [...txListFieldsMap.vote, ...defaultFields],

    //
    // // box
    // create_lock: [
    //     ...txListFieldsMap.create,
    //     ...defaultFields,
    //     {
    //         name: 'End Time',
    //         field: 'tx.value.msg.0.value.params.lock.end_time',
    //         linkType: '',
    //     },
    //     {
    //         name: 'Total Amount',
    //         field: 'tx.value.msg.0.value.params.total_amount.token',
    //         linkType: '',
    //     },
    //     {
    //         name: 'Description',
    //         field: 'tx.value.msg.0.value.params.description',
    //         linkType: '',
    //     },
    // ],
    // create_deposit: [
    //     ...txListFieldsMap.create,
    //     ...defaultFields,
    //     {
    //         name: 'Start Time',
    //         field: 'tx.value.msg.0.value.params.deposit.start_time',
    //         linkType: '',
    //     },
    //     {
    //         name: 'Total Amount',
    //         field: 'tx.value.msg.0.value.params.total_amount.token',
    //         linkType: '',
    //     },
    //     {
    //         name: 'Description',
    //         field: 'tx.value.msg.0.value.params.description',
    //         linkType: '',
    //     },
    // ],
    // create_future: [
    //     ...txListFieldsMap.create,
    //     ...defaultFields,
    //     {
    //         name: 'Total Amount',
    //         field: 'tx.value.msg.0.value.params.total_amount.token',
    //         linkType: '',
    //     },
    //     {
    //         name: 'Description',
    //         field: 'tx.value.msg.0.value.params.description',
    //         linkType: '',
    //     },
    // ],
    // withdraw_deposit: [...txListFieldsMap.withdraw, ...defaultFields],
    // withdraw_future: [...txListFieldsMap.withdraw, ...defaultFields],
    // inject_deposit: [
    //     ...txListFieldsMap.inject,
    //     ...defaultFields,
    //     {
    //         name: 'Amount',
    //         field: 'tx.value.msg.0.value.amount',
    //         linkType: '',
    //     },
    // ],
    // inject_future: [
    //     ...txListFieldsMap.inject,
    //     ...defaultFields,
    //     {
    //         name: 'Amount',
    //         field: 'tx.value.msg.0.value.amount',
    //         linkType: '',
    //     },
    // ],
    // cancel_deposit: [
    //     ...txListFieldsMap['cancel-deposit'],
    //     ...defaultFields,
    //     {
    //         name: 'Box ID',
    //         field: 'tx.value.msg.0.value.box_id',
    //         linkType: '',
    //     },
    //     {
    //         name: 'Sender',
    //         field: 'tx.value.msg.0.value.sender',
    //         linkType: 'address',
    //     },
    // ],
    // cancel_future: [
    //     ...txListFieldsMap['cancel-future'],
    //     ...defaultFields,
    //     {
    //         name: 'Box ID',
    //         field: 'tx.value.msg.0.value.box_id',
    //         linkType: '',
    //     },
    //     {
    //         name: 'Sender',
    //         field: 'tx.value.msg.0.value.sender',
    //         linkType: 'address',
    //     },
    // ],
    // describe: [
    //     ...defaultFields,
    //     {
    //         name: 'Box ID',
    //         field: 'tx.value.msg.0.value.box_id',
    //         linkType: '',
    //     },
    //     {
    //         name: 'Operator',
    //         field: 'tx.value.msg.0.value.sender',
    //         linkType: 'address',
    //     },
    //     {
    //         name: 'Description',
    //         field: 'tx.value.msg.0.value.description',
    //         linkType: '',
    //     },
    // ],
    // disable_feature: [
    //     ...defaultFields,
    //     {
    //         name: 'Box ID',
    //         field: 'tx.value.msg.0.value.box_id',
    //         linkType: '',
    //     },
    //     {
    //         name: 'Operator',
    //         field: 'tx.value.msg.0.value.sender',
    //         linkType: 'address',
    //     },
    //     {
    //         name: 'Feature',
    //         field: 'tx.value.msg.0.value.feature',
    //         linkType: '',
    //     },
    // ],
};
