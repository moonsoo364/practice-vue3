<template>
  <ul class="list-layout">
    <li class="list-layout__item" v-for="item in items" :key="item.id">
      <slot name="thumnail" :item="item"></slot>
      <slot name="main" :item="item">
        <div class="list-layout__item__name">{{ item.name }}</div>
        <div class="list-layout__item__description">{{ item.description }}</div>
      </slot>
      <slot name="actions" :items="item"></slot>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Item{
    id: number
    name: string
    description: string
    thumbnamil?: string
  }
const subPath = "https://res.cloudinary.com/mayashavin/image/upload/v1643005666/Demo/"

export default defineComponent({

  name: 'ListLayout',
  data(): { items : Item[] } {
    return {
      items:[
        {
          id: 1,
          name: 'Item 1',
          description: "This is item 1",
          thumbnamil: subPath+'supreme_pizza'
        },
        {
          id: 2,
          name: 'Item 2',
          description: 'This is item 2',
          thumbnamil: subPath+'hawaiian_pizza'
        },
        {
          id: 3,
          name: 'Item 3',
          description: 'This is item 3',
          thumbnamil: subPath+'pina_colada_pizza'
        }
      ]
    }
  },
})
</script>
