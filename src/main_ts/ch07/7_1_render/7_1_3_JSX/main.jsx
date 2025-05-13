import {createApp} from 'vue'
const JSXComp = <div>This is a JSX compnent</div>
const App ={
    render(){
        return JSXComp
    }
}
const app = createApp(App)
app.mount("#app")