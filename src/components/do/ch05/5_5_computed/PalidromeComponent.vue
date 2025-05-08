<template>
    <div>
        <h2>Palindrome Checker</h2>
        <p>Message: {{ message }}</p>
        <p>Reversed Message: {{ reversedMessage }}</p>
        <p v-if="isPalindrome">The message is a palindrome!</p>
        <p v-else>The message is not a palindrome.</p>
        <input v-model="message" placeholder="Type a message" />
    </div>
</template>
<script lang="ts" setup>
import { computed, ref} from 'vue';

const message = ref('Hello, Vue 3!');
const reversedMessage = computed<string>((
    () => message.value.split('').reverse().join('')
));
const isPalindrome = computed<boolean>(
    () => message.value === reversedMessage.value
)
</script>