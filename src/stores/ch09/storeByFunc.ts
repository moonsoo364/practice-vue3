import { defineStore } from "pinia";
import {reactive, computed} from 'vue'

export const useStore = defineStore('storeName', ()=>{
    const myData = reactive({ value: 0 })
    const computedData = computed(()=> myData.value )
    const myAction = () =>{}

    return {
        myData,
        computedData,
        myAction
    }
})
