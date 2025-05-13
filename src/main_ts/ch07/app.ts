import { createApp, h } from 'vue'

const App = {
    render() {
        return h(
            'div',
            { id: 'test-id' },
            'this is a render function test with Vue'
        )
    }
}

const app = createApp(App) // App을 Vue 인스턴스로 생성
app.mount('#app')
