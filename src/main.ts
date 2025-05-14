import { createApp } from 'vue'
import truncate from '@/main_ts/ch07/7_4_plugin/plugin_setup.ts'



//SFC파일
import MyComponent from './components/do/MyComponent.vue';


// import './assets/main.css'
//원본 코드
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(truncate, { limit: 10 }) // 플러그인 사용
app.use(createPinia())
app.component('MyComponent', MyComponent);
app.use(router)
app.mount("#app")
