import { createApp } from 'vue'

// import './assets/main.css'
/**원본 코드
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
*/

// app.mount('#app')

// render() 함수로 Vue 앱을 만들기

// const App = {
//   render() {
//     return "This is the app's entrance"
//   },
// }
// const app = createApp(App)
// app.mount('#app')
// tmplate 방식으로 Vue 앱을 만들기

// const Description = {
//   template: "This is the app's entrance",
// }

// const App = {
//   components: { Description },
//   template: '<Description />',
// }

// const app = createApp(App)
// app.mount('#app')

const App = {
  template: `<h1>This is the app's entrance</h1>
    <h2>We are exploring template syntax</h2>`,
}
const app = createApp(App)
app.mount('#app')
