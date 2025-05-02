//2-14 v-show
import { createApp } from 'vue'

const App = {
  template : `
  <span> 
    <div v-show="isVisible">I'm the text in toggle</div>
    <div>Visablility : {{isVisible}}</div>
  </span>
  `,
  data(){
    return {
      isVisible: false
    }
  }
  
}
const app = createApp(App)
app.mount('#app')