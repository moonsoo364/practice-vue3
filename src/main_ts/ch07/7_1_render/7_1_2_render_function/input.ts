import { createApp, h } from 'vue'

const inputElem = h(
    'input',
    {
        placeholder:'Enter some text',
        type: 'text',
        id: 'text-input'
    }
)
const comp = h(
    'div',
    {
        id: 'my-test-comp',
        style: {border: '1px solid blue'}
    },
    inputElem

)

const App = {
    render() {
        return h(
            comp
        )
    }
}

const app = createApp(App) // App을 Vue 인스턴스로 생성
app.mount('#app')
