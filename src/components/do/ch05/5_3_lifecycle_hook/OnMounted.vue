<script lang="ts" setup>
    import { onBeforeMount } from 'vue'

    onBeforeMount(() => {
        console.log('onBeforeMount')
        console.log('onBeforeMount', this);
        
    })
</script>