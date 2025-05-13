import {h} from 'vue'

export function MyFuctionComp(props, context){
    return h()
}

export function MyHeading(props, context){
    const heading =`h${props.level}`
    return h(heading, context.$attrs, context.$slots);
}