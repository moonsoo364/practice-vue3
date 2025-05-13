//2-5 Component Data 
import { createApp, type ComponentOptions } from 'vue'

type Data ={title : string;}

const App = {
  template : `<h1>{{title}}</h1>`,
    data() : Data {
      return{
      title : 'My First Vue component',
    }
  },
  created(){
    console.log((this as ComponentOptions<Data>).title)
  }
}

const app = createApp(App)
app.mount('#app')

