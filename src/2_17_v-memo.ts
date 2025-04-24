//2-17 v-once 및 v-memo를 이용한 렌더링 최적화
import { createApp } from 'vue'

// const App = {
//   template : `
//     <div>
//       <input v-model="name" placeholder="Enter your name">
//     </div>
//     <div v-once>{{name}}</div>
//   `,
//   data(){
//     return {
//       name: 'My Name is..'
//     }
//   }
  
// }
// const app = createApp(App)
// app.mount('#app')
const mainUrl = 'https://res.cloudinary.com/mayashavin/image/upload/w_100,h_100,c_thumb/'
const App ={
  template:`
    <ul>
      <li
        v-for="image in images"
        :key="image.id"
        @click="selected = image.id"
        :style="selected === image.id ? {border: '1px solid blue'} : {}"
        v-memo="[selected === image.id]">
          <img :src="image.url" :alt="image.title"/>
          <div>{{image.title}}</div>
        </li>
      </ul>
  `,
  data() {
    return {
      selected : null,
      images: [
        {
          id: 1,
          title: 'Cute Cat',
          url: mainUrl+'TheCute%20Cat',
        },
        {
          id: 2,
          title: 'Cute Cat no 2',
          url: mainUrl+'cute_cat',
        },
        {
          id: 3,
          title: 'Cute Cat no 3',
          url: mainUrl+'cat_me',
        },
        {
          id: 4,
          title: 'Just Cat',
          url: mainUrl+'cat_1',
        },
      ]
    }
  }
}

const app = createApp(App)
app.mount('#app')