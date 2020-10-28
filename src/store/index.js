import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginEmail: '',
        loginPassword: '',
        loginError: '',
        registerUserName: '',
        registerEmail: '',
        registerPassword: '',
        registerUid: '',
        registerMoney: 1000,
        registerError: '',
        users: [],
        name: '',
        money: '',
        showWalletModal: false,
        showTransferModal: false,
        modalUser: '',
        modalMoney: '',
        transferMoney: '',
    },
    mutations: {
        updateLoginEmail(state, email) {
            state.loginEmail = email;
        },
        updateLoginPassword(state, password) {
            state.loginPassword = password;
        },
        updateLoginError(state, error) {
            state.loginError = error;
        },
        updateRegisterUserName(state, userName) {
            state.registerUserName = userName;
        },
        updateRegisterEmail(state, email) {
            state.registerEmail = email;
        },
        updateRegisterPassword(state, password) {
            state.registerPassword = password;
        },
        updateRegisterError(state, error) {
            state.registerError = error;
        },
        users(state, user) {
            state.users = user;
        },
        name(state, name) {
            state.name = name;
        },
        money(state, money) {
            state.money = money;
        },
        showWalletModal(state, wallet) {
            state.showWalletModal = wallet;
        },
        showTransferModal(state, transfer) {
            state.showTransferModal = transfer;
        },
        modalUser(state, user) {
            state.modalUser = user;
        },
        modalMoney(state, money) {
            state.modalMoney = money;
        },
        transferMoney(state, money) {
            state.transferMoney = money;
        },
        toggleWalletModal(state, user) {
            state.showWalletModal = !state.showWalletModal;
            state.modalUser = user.name;
            state.modalMoney = user.money;
        },
        toggleTransferModal(state, user) {
            state.showTransferModal = !state.showTransferModal;
            state.modalUser = user.name;
            state.modalMoney = user.money;
        },
        transferCalculation(state, money) {
            state.showTransferModal = !state.showTransferModal;

            const loginUser = firebase.auth().currentUser;
            const db = firebase.firestore();
            const collectionUsers = db.collection('users');

            //ログインユーザー
            const userTransfer = state.transferMoney;

            //選択されたユーザー
            const filterArryUsers = state.users.filter((val) => {
                return val.name === state.modalUser;
            });

            //バッチ処理
            const moneyTransferBatch = db.batch();

            //ログインユーザーのバッチ処理
            moneyTransferBatch.update(collectionUsers.doc(loginUser.uid), {
                money: money - userTransfer,
            });

            //選択されたユーザーのバッチ処理
            moneyTransferBatch.update(
                collectionUsers.doc(filterArryUsers[0].uid),
                {
                    money:
                        parseInt(filterArryUsers[0].money) +
                        parseInt(userTransfer),
                }
            );

            //バッチ処理(コミット)
            moneyTransferBatch
                .commit()
                .then(() => {
                    filterArryUsers[0].money += parseInt(userTransfer);
                    console.log(filterArryUsers);
                })
                .catch(() => {
                    alert(
                        '送金がうまくいきませんでした。最初からやり直してください'
                    );
                });
            state.transferMoney = '';
        },
        login(state) {
            firebase
                .auth()
                .signInWithEmailAndPassword(
                    state.loginEmail,
                    state.loginPassword
                )
                .then((res) => {
                    console.log(res);
                })
                .catch(() => {
                    state.loginPassword = '';
                    state.loginError =
                        '入力したメールアドレスかパスワードに誤りがあります。';
                });
        },
        registerUser(state) {
            const db = firebase.firestore();
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    state.registerEmail,
                    state.registerPassword
                )
                .then((res) => {
                    //displayNameにユーザー名を格納
                    res.user.updateProfile({
                        displayName: state.registerUserName,
                    });

                    const loginUser = firebase.auth().currentUser;
                    state.registerUid = loginUser.uid;

                    db.collection('users')
                        .doc(loginUser.uid)
                        .set({
                            name: state.registerUserName,
                            email: state.registerEmail,
                            money: state.registerMoney,
                            uid: state.registerUid,
                        })
                        .then(() => {
                            state.loginEmail = state.registerEmail;
                            state.loginPassword = state.registerPassword;
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                })
                .catch((e) => {
                    console.log(e);
                    if (e.code == 'auth/email-already-in-use') {
                        state.registerError =
                            '入力したメールアドレスは登録済みです。';
                    } else if (e.code == 'auth/weak-password') {
                        state.registerError =
                            'パスワードは最低でも6文字以上にしてください';
                    } else {
                        state.registerError =
                            '入力したメールアドレスかパスワードに問題があります。';
                    }
                });
        },
        createDashBoard(state) {
            const loginUser = firebase.auth().currentUser;
            const db = firebase.firestore();

            if (loginUser) {
                db.collection('users')
                    .where('name', '==', loginUser.displayName)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            state.name = doc.data().name;
                            state.money = doc.data().money;
                        });
                    })
                    .catch(() => {
                        alert(
                            'createDashBoardのif(loginUser)の箇所でエラー発生'
                        );
                    });
            }

            state.users = [];

            db.collection('users')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        state.users.push(doc.data());
                    });
                })
                .catch(() => {
                    alert(
                        'createDashBoardのdb.collection("users")でエラーが発生'
                    );
                });
        },
        signOut(state) {
            firebase.auth().signOut();
            state.registerUserName = '';
            state.registerEmail = '';
            state.registerPassword = '';
        },
    },
    actions: {
        login(context) {
            context.commit('login');
        },
        registerUser(context) {
            context.commit('registerUser');
        },
        createDashBoard(context) {
            context.commit('createDashBoard');
        },
    },
    modules: {},
});
