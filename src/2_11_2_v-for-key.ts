//2-11-2 v-for
import { createApp } from 'vue'

const Collection = {
  data(){
    return{
      collection: {
        title : 'Watch Moonknight',
        description: 'Log in Disney+ and watch all the chapters',
        priority : 5
      }
    }
  },
  template: `
  <ul>
    <li v-for="(value, name) in collection" :key="key">
    {{name}} : {{value}}
    </li>
  </ul>
  `,
}
const app = createApp({
  components: {Collection},
  template: `<Collection/>`,
})
app.mount('#app')