import {createApp} from 'vue'
const name = 'JSX'
const JSXComp = <div>This is a {name} compnent</div>
const App ={
    render(){
        return JSXComp
    }
}
const app = createApp(App)
app.mount("#app")