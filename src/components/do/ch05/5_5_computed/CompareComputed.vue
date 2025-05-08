<script lang="ts" setup>
import { computed, ref} from 'vue';

const message = ref('Hello, Vue 3!');
const reversedMessage = computed<string>((
    () => message.value.split('').reverse().join('')
));

</script>