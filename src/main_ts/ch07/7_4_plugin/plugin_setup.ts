import type { App } from 'vue'

export default {
  install(app: App<Element>, options: any) {
    //intall
    const truncate = (str: string) => {
      if (str.length > options.limit) {
        return `${str.slice(0, options.limit)}...`
      }
      return str
    }
    app.config.globalProperties.$truncate = truncate
    app.provide('plugins', { truncate }) // provide
  },
}
