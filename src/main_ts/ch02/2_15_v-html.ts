//2-15 v-html
import { createApp } from 'vue'

const App = {
  template : `
    <div v-html="innerHtml"/>
  `,
  data(){
    return {
      innerHtml: '<h1>This is the app\'s entrance</h1><h2>We are exploring template syntax</h2>'
    }
  }
  
}
const app = createApp(App)
app.mount('#app')