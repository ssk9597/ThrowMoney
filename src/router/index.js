import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: (to, from, next) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    console.log(user);
                    next();
                } else {
                    next('/login');
                }
            });
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
