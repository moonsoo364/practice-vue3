import { createApp } from 'vue'

// const app = createApp({template: '<MyComponent />'});
// const MyComponent = {
//   template: 'This is my global component' // 'templage' -> 'template'로 수정
// }

// app.component('MyComponent', MyComponent)
// app.mount('#app')

//SFC파일
import MyComponent from './components/do/MyComponent.vue';


// import './assets/main.css'
//원본 코드
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.component('MyComponent', MyComponent);
app.use(router)
app.mount("#app")