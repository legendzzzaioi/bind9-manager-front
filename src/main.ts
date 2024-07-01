import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Button } from 'ant-design-vue';

createApp(App)
  .use(router)
  .use(Button)
  .mount('#app');
