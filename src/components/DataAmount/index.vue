<template>
  <span>
    {{ list | formatAmount }}
  </span>
</template>

<script>
    export default {
        name: 'Amount',
        props: {
            list: Array,
        },
    };
</script>
