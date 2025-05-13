//2-5 Component Data
import { createApp, type ComponentOptions } from 'vue'

type Data = { counter: number }

const App = {
  template: `<div>Counter : {{ counter }}</div>`,
  data(): Data {
    return {
      counter: 0,
    }
  },
  created() {
    const interval = setInterval(() => {
      ;(this as ComponentOptions<Data>).counter++
    }, 1000)

    setTimeout(() => {
      clearInterval(interval)
    }, 5000)
  },
}

const app = createApp(App)
app.mount('#app')
