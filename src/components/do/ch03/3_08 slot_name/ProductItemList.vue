<template>
  <ListLayout>
    <template #thumnail="{ item }">
      <img
        v-if="item.thumbnamil"
        class="list-layout__item__thumnail"
        :src="item.thumbnamil"
        :alt="item"
        width="200"
      />
      <div class="list-layout__item__name">{{ item.name }}</div>
    </template>
  </ListLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ListLayout from './ListLayout.vue'

export default defineComponent({
  components: { ListLayout },
  name: 'ProductItemList',
})
</script>

<style scoped>
.list-layout__item__thumnail {
  width: 400px; /* 원하는 너비 */
  height: auto; /* 비율 유지 */
  object-fit: cover; /* 이미지가 잘리지 않도록 조정 */
}
</style>
