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
        registerMoney: 1000,
        registerError: '',
        name: '',
        money: '',
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
        name(state, name) {
            state.name = name;
        },
        money(state, money) {
            state.money = money;
        },
        login(state) {
            firebase
                .auth()
                .signInWithEmailAndPassword(state.loginEmail, state.loginPassword)
                .then((res) => {
                    console.log(res);
                })
                .catch(() => {
                    state.loginPassword = '';
                    state.loginError = '入力したメールアドレスかパスワードに誤りがあります。';
                });
        },
        registerUser(state) {
            const db = firebase.firestore();
            firebase
                .auth()
                .createUserWithEmailAndPassword(state.registerEmail, state.registerPassword)
                .then((res) => {
                    //displayNameにユーザー名を格納
                    res.user.updateProfile({
                        displayName: state.registerUserName,
                    });

                    db.collection('users')
                        .add({
                            name: state.registerUserName,
                            email: state.registerEmail,
                            money: state.registerMoney,
                        })
                        .then(() => {
                            console.log('OK');
                            state.loginEmail = state.registerEmail;
                            state.loginPassword = state.registerPassword;
                            // state.$router.push('/');
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                })
                .catch((e) => {
                    console.log(e);
                    if (e.code == 'auth/email-already-in-use') {
                        state.registerError = '入力したメールアドレスは登録済みです。';
                    } else if (e.code == 'auth/weak-password') {
                        state.registerError = 'パスワードは最低でも6文字以上にしてください';
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
                    });
            }

            state.users = [];

            db.collection('users')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        state.users.push(doc.data());
                    });
                });
            console.log(state.users);
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
