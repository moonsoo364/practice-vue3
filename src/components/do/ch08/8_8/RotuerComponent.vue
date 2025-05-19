<template>
	<button @click="rotuer.back()"> Back</button>
    <button @click="rotuer.forward()">forward</button> 
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';

const rotuer = useRouter();

</script>