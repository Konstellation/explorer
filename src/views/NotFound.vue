<template>
    <div class="not-found-container">
        <card title="Not Found">
            <div class="content">
                <p>Sorry, This page is not found.</p>
                <p>
                    Return to
                    <router-link to="/">
                        HomePage
                    </router-link>
                    .
                </p>
            </div>
        </card>
    </div>
</template>

<script>
    export default {
        name: 'NotFound',
    };
</script>

<style lang="scss" scoped>
    .not-found-container {
        font-size: 24px;
        text-align: center;
        color: rgba(255, 255, 255, 0.8);

        .content {
            margin: 64px 0;
        }
    }
</style>
