import {createApp} from 'vue'
const name = 'JSX'
const id = 'jsx-comp'
const JSXComp = <div id = {id}>This is a {name} compnent</div>
const App ={
    render(){
        return JSXComp
    }
}
const app = createApp(App)
app.mount("#app")