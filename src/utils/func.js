export const features = token => {
    const tr = {
        burn_owner_disabled: 'Burn owner disabled',
        burn_owner_enabled: 'Burn owner enabled',
        burn_holder_disabled: 'Burn holder disabled',
        burn_holder_enabled: 'Burn holder enabled',
        burn_from_disabled: 'Burn from disabled',
        burn_from_enabled: 'Burn from enabled',
        mint_disabled: 'Mint disabled',
        mint_enabled: 'Mint enabled',
        freeze_disabled: 'Freeze disabled',
        freeze_enabled: 'Freeze enabled',
    };

    return [
        {
            key: `burn_owner_${token.burn_owner_disabled ? 'disabled' : 'enabled'}`,
            title: tr[`burn_owner_${token.burn_owner_disabled ? 'disabled' : 'enabled'}`],
            icon: 'burn',
            class: token.burn_owner_disabled ? 'disabled' : 'enabled',
        },
        {
            key: `burn_holder_${token.burn_holder_disabled ? 'disabled' : 'enabled'}`,
            title: tr[`burn_holder_${token.burn_holder_disabled ? 'disabled' : 'enabled'}`],
            icon: 'fire',
            class: token.burn_holder_disabled ? 'disabled' : 'enabled',
        },
        {
            key: `burn_from_${token.burn_from_disabled ? 'disabled' : 'enabled'}`,
            title: tr[`burn_from_${token.burn_from_disabled ? 'disabled' : 'enabled'}`],
            icon: 'fire-alt',
            class: token.burn_from_disabled ? 'disabled' : 'enabled',
        },
        {
            key: `mint_${token.mint_disabled ? 'disabled' : 'enabled'}`,
            title: tr[`mint_${token.mint_disabled ? 'disabled' : 'enabled'}`],
            icon: 'hammer',
            class: token.mint_disabled ? 'disabled' : 'enabled',
        },
        {
            key: `freeze_${token.freeze_disabled ? 'disabled' : 'enabled'}`,
            title: tr[`freeze_${token.freeze_disabled ? 'disabled' : 'enabled'}`],
            icon: 'snowflake',
            class: token.freeze_disabled ? 'disabled' : 'enabled',
        },
    ];
};
