<template>
    <header class="flex justify-between p-5 border-b items-center bg-white">
        <h1 class="font-semibold text-2xl leading-tight hover:opacity-50">
            <router-link to="/"> Throw Money </router-link>
        </h1>
        <button
            class="py-2 px-5 mr-3 border-2 border-blue-800 rounded hover:bg-blue-800 hover:text-white"
            @click="signOut()"
        >
            ログアウト
        </button>
    </header>
</template>

<script>
export default {
    methods: {
        signOut() {
            this.$store.commit('signOut');
            this.$router.push('/login');
        },
    },
};
</script>

<style></style>