import { createApp } from 'vue'

const app = createApp({template: '<MyComponent />'});
const MyComponent = {
  template: 'This is my global component' // 'templage' -> 'template'로 수정
}

app.component('MyComponent', MyComponent)
app.mount('#app')
//SFC파일