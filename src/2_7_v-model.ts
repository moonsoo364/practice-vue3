//2-5 Component Data
import { createApp } from 'vue'

// input 예제 1
// const NameInput = {
//   template: `
//   <label for="name">
//   Write your name:
//     <input
//      v-model="name"
//      placeholder="Enter your name"
//      id="name"
//     />
//   </label>
//   `,
//   data() {
//     return {
//       name: '',
//     }
//   },
// }
// const app = createApp({
//   components: {
//     NameInput,
//   },
//   template: `<NameInput/>`,
// })
// app.mount('#app')

//checklist  예제
const CourseChecklist = {
  template: `
		<div>The course checklist: {{list.join(', ')}}</div>
    <div>
      <label for="chapter1">
        <input type="checkbox" id="chapter1" value="chapter1" v-model="list"/>
        Chapter 1
      </label>
      <label for="chapter2">
        <input type="checkbox" id="chapter2" value="chapter2" v-model="list"/>
        Chapter 2
      </label>
      <label for="chapter3">
        <input type="checkbox" id="chapter3" value="chapter3" v-model="list"/>
        Chapter 3
      </label>
    </div>
	`,
  data() {
    return {
      list: [],
    }
  },
}

const app = createApp({
  components: {
    CourseChecklist,
  },
  template: `<CourseChecklist/>`,
})
app.mount('#app')
