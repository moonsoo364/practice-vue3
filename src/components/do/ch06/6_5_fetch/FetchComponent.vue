<template>
  <slot name="loading" v-if="isLoading">
    <div class="loading-message">Loading...</div>
  </slot>
  <slot :data="data" v-if="data"></slot>
  <slot name="error" v-if="error">
    <div class="error">
      <p>Error: {{ error.message }}</p>
    </div>
</template>

<script lang="ts" setup>
import { ref,defineProps } from 'vue';

const data = ref<object | undefined>();
const error = ref<Error | undefined>();
const isLoading = ref(false);


const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    default: "GET",
  },
})

async function ferchData() {
  try{
    const response = await fetch(props.url, {
      method: props.method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data.value = await response.json();
  } catch (err) {
    error.value = err as Error;
  } finally {
    isLoading.value = false;
  }
}
ferchData();
</script>
