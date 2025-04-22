//2-11 v-for
import { createApp } from 'vue'


const List = {
  template:`
  <ul>
    <li v-for="number in numbers" :key="number">{{number}}</li>
    </url>
  `,
  data(){
    return {
      numbers: [1, 2, 3, 4, 5],
    }
  }
}
const app = createApp({
  components: {List},
  template: `<List/>`,
})
app.mount('#app')

//2.11 v-for with objects
// const List = {
//   template: `
//   <ul>
//     <li v-for="(task, index) in tasks" :key="task.id">
//     {{title}} {{index}}: {{task.description}}
//     </li>
//   </ul>
//   `,
//   data(){
//     return {
//       tasks:[
//         {id:'task01', description:'Buy Groceries'},
//         {id:'task02', description:'Do laundry'},
//         {id:'task03', description:'Watch Moonknight'}
//       ],
//       title: 'Task',
//     }
//   }
// }
// const app = createApp({
//   components: {List},
//   template: `<List/>`,
// })
// app.mount('#app')
//