import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import FetchService from '@/services/fetch.service';

const app = createApp(App);
app.config.globalProperties.fetchService = FetchService;
app.config.globalProperties.fetchService.setRouter(router);
app.use(router);

app.mount('#app');
