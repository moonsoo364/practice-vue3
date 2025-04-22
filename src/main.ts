//2-12 v-on eventlistner
import { createApp, type ComponentOptions } from 'vue'

const App = {
  template : `
    <input @keydown.enter="onEnter"/>
  `,
  methods:{
    onEnter(e: KeyboardEvent){
        console.log('Enter key pressed')
    }
  },
  
}
const app = createApp(App)
app.mount('#app')