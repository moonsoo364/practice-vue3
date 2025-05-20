import { defineStore } from "pinia";

export const useStore = defineStore('storeName', ()=>{
    return{
        state: () =>({
            myData:{}
        }),
        getters:{
            computedData: () =>{}
        },
        actions:{
            myAction(){}
        }
    }
})