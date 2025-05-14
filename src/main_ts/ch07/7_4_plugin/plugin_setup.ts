import type { App } from 'vue'

export default {
  install(app: App<Element>, options: any) {
    //intall
    const truncate = (str: string) => {
      if (str.length > options.limit) {
        const sliced :string = str.slice(0, options.limit);
        console.log(sliced);
        
        return `${sliced}...`
      }
      return str
    }
    app.config.globalProperties.$truncate = truncate
    app.provide('plugins', { truncate }) // provide
  },
}
