//2-13 v-if
import { createApp } from 'vue'

// const App = {
//   template : `
//   <span> 
//     <div v-if="isVisible">I'm the visible test</div>
//     <div v-else>I'm the invisible test</div>
//   </span>
//   `,
//   data(){
//     return {
//       isVisible: true,
//     }
//   }
  
// }
// const app = createApp(App)
// app.mount('#app')

//2-13 v-else-if

const App = {
  template : `
  <span> 
    <div v-if="isVisible">I'm the visible text</div>
    <div v-else-if="showSubstile">I'm the subtitle text</div>
    <div v-else>I'm the invisible text</div>
  </span>
  `,
  data(){
    return {
      isVisible: false,
      showSubstile: false,
    }
  }
  
}
const app = createApp(App)
app.mount('#app')