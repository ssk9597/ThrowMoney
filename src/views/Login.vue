<template>
    <div class="flex flex-col h-screen">
        <Header />
        <div class="bg-gray-100 flex-auto">
            <div class="flex justify-center mt-20">
                <div class="w-3/5 border bg-white">
                    <div class="my-16 text-center">
                        <h2 class="text-4xl font-bold">ログイン</h2>
                        <form class="mt-12">
                            <div class="mb-3">
                                <input
                                    type="email"
                                    v-model="email"
                                    placeholder="you@gmail.com"
                                    class="text-xl w-3/5 p-3 border rounded"
                                />
                            </div>
                            <div class="mb-8">
                                <input
                                    type="password"
                                    v-model="password"
                                    placeholder="パスワード"
                                    class="text-xl w-3/5 p-3 border rounded"
                                />
                            </div>
                            <div v-if="error">
                                <div class="my-4 font-semibold text-red-700">
                                    {{ error }}
                                </div>
                            </div>
                            <button
                                type="submit"
                                class="text-xl w-2/5 bg-blue-800 text-white py-2 rounded hover:opacity-75"
                                @click.prevent="login()"
                            >
                                登録
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
    components: {
        Header,
    },
    computed: {
        email: {
            get() {
                return this.$store.state.loginEmail;
            },
            set(value) {
                this.$store.commit('updateLoginEmail', value);
            },
        },
        password: {
            get() {
                return this.$store.state.loginPassword;
            },
            set(value) {
                this.$store.commit('updateLoginPassword', value);
            },
        },
        error: {
            get() {
                return this.$store.state.loginError;
            },
            set(value) {
                this.$store.commit('updateLoginError', value);
            },
        },
    },
    methods: {
        login() {
            this.$store.dispatch('login');
            this.$router.push('/');
        },
    },
};
</script>

<style></style>