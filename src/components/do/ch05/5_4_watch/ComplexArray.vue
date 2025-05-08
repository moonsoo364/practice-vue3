<script lang="ts" setup>
watch(
    sources: WatchSouce,
    cb: (newValue: T, oldValue: T, cleanup:(func)=>void) => any,
    options?:WatchOptions
): WatchStopHandle
</script>