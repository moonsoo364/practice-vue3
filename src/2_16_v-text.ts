//2-16 v-text
import { createApp } from 'vue'

const App = {
  template : `
    <div v-text="text">PlaceHoder</div>
  `,
  data(){
    return {
      text: 'Hello World'
    }
  }
  
}
const app = createApp(App)
app.mount('#app')