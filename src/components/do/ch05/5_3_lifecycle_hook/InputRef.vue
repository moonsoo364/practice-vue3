<template>
    <div>
        <input type="text" ref="inputRef" />
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, onUpdated, ref } from 'vue'
    const inputRef = ref(null)
    onMounted(() => {
        console.log(' Dom instance: ',inputRef.value); // null
    })

    onUpdated(() => {
        console.log(inputRef.value); // null
    })

    onMounted(() => {
        console.log(' Dom instance: ',inputRef.value); // null        
    })
</script>