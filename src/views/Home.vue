<template>
    <div class="h-screen bg-gray-100">
        <HeaderLogout />
        <div>
            <p class="pt-10 pb-3 text-center text-2xl">{{ name }}さん、ようこそ</p>
            <p class="text-right pr-10 text-xl">残高：{{ money }}円</p>
        </div>
    </div>
</template>

<script>
import HeaderLogout from '@/components/HeaderLogout.vue';
export default {
    components: {
        HeaderLogout,
    },
    computed: {
        name: {
            get() {
                return this.$store.state.name;
            },
            set(value) {
                this.$store.commit('name', value);
            },
        },
        money: {
            get() {
                return this.$store.state.money;
            },
            set(value) {
                this.$store.commit('money', value);
            },
        },
    },
    created() {
        this.$store.dispatch('createDashBoard');
    },
};
</script>

<style></style>
