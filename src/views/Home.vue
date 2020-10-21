<template>
    <div class="h-screen bg-gray-100">
        <HeaderLogout />
        <div>
            <p class="pt-10 pb-3 text-center text-2xl">{{ name }}さん、ようこそ</p>
            <p class="text-right pr-10 text-xl">残高：{{ money }}円</p>

            <div class="bg-gray-100 flex-auto">
                <div class="flex justify-center mt-20">
                    <div class="w-4/5 border bg-white">
                        <div class="my-16">
                            <h2 class="text-4xl font-bold text-center">送金先</h2>
                            <div class="pt-16 ml-10">
                                <div>
                                    <p class="font-bold text-xl">ユーザー名</p>
                                </div>

                                <!-- ここはv-forで作成 -->
                                <div v-for="user in users" :key="user">
                                    <div v-if="user.name != name">
                                        <div class="pt-3 flex items-center justify-between">
                                            <p>{{ user.name }}</p>
                                            <div>
                                                <!-- モーダルボタン -->
                                                <button
                                                    class="bg-blue-800 text-white active:bg-blue-800 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-10"
                                                    type="button"
                                                    style="transition: all 0.15s ease"
                                                    @click.prevent="toggleWalletModal(user)"
                                                >
                                                    walletを見る
                                                </button>
                                                <!-- モーダルボタン -->
                                                <!-- モーダル -->
                                                <div
                                                    v-if="showWalletModal"
                                                    class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
                                                >
                                                    <div
                                                        class="relative w-2/5 my-6 mx-auto max-w-3xl"
                                                    >
                                                        <div
                                                            class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                                                        >
                                                            <div
                                                                class="flex align-items justify-between p-5 border-b border-solid border-gray-300 rounded-t"
                                                            >
                                                                <h3 class="text-xl font-semibold">
                                                                    {{ modalUser }}さんの残高
                                                                </h3>
                                                                <button
                                                                    class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                    @click.prevent="
                                                                        toggleWalletModal(user)
                                                                    "
                                                                >
                                                                    <span
                                                                        class="bg-transparent opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
                                                                    >
                                                                        ×
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div class="relative p-6 flex-auto">
                                                                <p
                                                                    class="my-4 text-lg leading-relaxed text-center"
                                                                >
                                                                    {{ modalMoney }}円
                                                                </p>
                                                            </div>
                                                            <div
                                                                class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b"
                                                            >
                                                                <button
                                                                    class="bg-blue-800 text-white bg-transparent border border-solid border-blue-800 hover:opacity-75 active:bg-red-600 font-bold uppercase text-sm px-5 py-3 rounded outline-none focus:outline-none"
                                                                    type="button"
                                                                    style="
                                                                        transition: all 0.15s ease;
                                                                    "
                                                                    @click.prevent="
                                                                        toggleWalletModal(user)
                                                                    "
                                                                >
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- モーダル -->

                                                <!-- モーダルボタン -->
                                                <button
                                                    class="bg-blue-800 text-white active:bg-blue-800 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-10"
                                                    type="button"
                                                    style="transition: all 0.15s ease"
                                                >
                                                    送る
                                                </button>
                                                <!-- モーダルボタン -->
                                                <div
                                                    v-if="showWalletModal"
                                                    class="opacity-25 fixed inset-0 z-40 bg-black"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- ここはv-forで作成 -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderLogout from '@/components/HeaderLogout.vue';

export default {
    components: {
        HeaderLogout,
    },
    methods: {
        toggleWalletModal(user) {
            this.$store.commit('toggleWalletModal', user);
        },
        toggleTransferModal(user) {
            this.$store.commit('toggleTransferModal', user);
        },
    },
    computed: {
        users: {
            get() {
                return this.$store.state.users;
            },
            set(value) {
                this.$store.commit('users', value);
            },
        },
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
        showWalletModal: {
            get() {
                return this.$store.state.showWalletModal;
            },
            set(value) {
                this.$store.commit('showWalletModal', value);
            },
        },
        modalUser: {
            get() {
                return this.$store.state.modalUser;
            },
            set(value) {
                this.$store.commit('modalUser', value);
            },
        },
        modalMoney: {
            get() {
                return this.$store.state.modalMoney;
            },
            set(value) {
                this.$store.commit('modalMoney', value);
            },
        },
    },
    created() {
        this.$store.dispatch('createDashBoard');
    },
};
</script>

<style></style>
