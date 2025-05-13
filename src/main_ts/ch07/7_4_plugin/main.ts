import { createApp, defineComponent } from 'vue'
import truncate from '@/main_ts/ch07/7_4_plugin/plugin.ts'

// import './assets/main.css'
//원

const App = defineComponent({
  template: `
    <h1> {{ $truncate('My truncated long text') }} </h1>
    <h2> {{ truncatedText }} </h2>
  `,
  data() {
    return {
      truncatedText: this.$truncate('My 2nd truncated text'),
    }
  },
})

const app = createApp(App)
app.use(truncate, { limit: 10 }) // 플러그인 사용

app.mount('#app')
