import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './tailwind/tailwind.css'
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

let app;
onAuthStateChanged(auth, () => {
    if (!app) {
        app = createApp(App);
        app.use(router);
        app.use(store);
        app.mount('#app');

    }
})



