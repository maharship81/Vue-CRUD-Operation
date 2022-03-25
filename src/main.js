import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import App from './App.vue'
import router from './routes'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas);

createApp(App).use(router).component('fa',FontAwesomeIcon).mount('#app');
