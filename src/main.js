import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

//firebaseを読み込む
import firebase from 'firebase/app';
//tailwindcssを読み込む
import '@/assets/tailwind.css';

Vue.config.productionTip = false;

var firebaseConfig = {
    apiKey: 'AIzaSyCIbwj5HcO3EYBjTAY8ZizGGaqZhSSOzKs',
    authDomain: 'throw-money.firebaseapp.com',
    databaseURL: 'https://throw-money.firebaseio.com',
    projectId: 'throw-money',
    storageBucket: 'throw-money.appspot.com',
    messagingSenderId: '663590544852',
    appId: '1:663590544852:web:fbc423ee898d9910a0a241',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
