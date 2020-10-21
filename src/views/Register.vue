<template>
    <div class="flex flex-col h-screen">
        <Header />
        <div class="bg-gray-100 flex-auto">
            <div class="flex justify-center mt-20">
                <div class="w-3/5 border bg-white">
                    <div class="my-16 text-center">
                        <h2 class="text-4xl font-bold">新規登録</h2>
                        <form class="mt-12">
                            <div class="mb-3">
                                <input
                                    type="text"
                                    v-model="userName"
                                    placeholder="ユーザー名"
                                    class="text-xl w-3/5 p-3 border rounded"
                                />
                            </div>
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
                                    placeholder="パスワード(6文字以上)"
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
                                @click.prevent="registerUser()"
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
        userName: {
            get() {
                return this.$store.state.registerUserName;
            },
            set(value) {
                this.$store.commit('updateRegisterUserName', value);
            },
        },
        email: {
            get() {
                return this.$store.state.registerEmail;
            },
            set(value) {
                this.$store.commit('updateRegisterEmail', value);
            },
        },
        password: {
            get() {
                return this.$store.state.registerPassword;
            },
            set(value) {
                this.$store.commit('updateRegisterPassword', value);
            },
        },
        error: {
            get() {
                return this.$store.state.registerError;
            },
            set(value) {
                this.$store.commit('updateRegisterError', value);
            },
        },
    },
    methods: {
        registerUser() {
            this.$store.dispatch('registerUser');
            this.$router.push('/');
        },
    },
};
</script>

<style></style>