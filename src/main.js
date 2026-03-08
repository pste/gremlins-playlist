import { createApp } from 'vue'
import { createPinia } from 'pinia'

// plugins (pinia, vuetify, ...)
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue'

// build app
const app = createApp(App)
registerPlugins(app);
app.mount('#app')