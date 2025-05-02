<template>
  <div>
    <input 
        type="checkbox" 
        :checked="task.completed"
        @change="onTaskCompleted"  
    />
    <span>{{ task.title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Task } from '@/components/do/ch04/type/Class';

export default defineComponent({
  name: 'ToDoItem',
  methods:{
    onTaskCompleted(event: Event){
        const isCheked :boolean = (event.target as HTMLInputElement)?.checked;
        console.log(isCheked);
        console.log(this.task);
        
        this.$emit('task-completed-toggle',{
            ...this.task,//기존에 갖고 있는 객체의 필드 중 completed만 새로운 값으로 변경
            completed: isCheked,//변경된 값을 전달
        })
    }
  },
  props: {
    task: {
      type: Object as () => Task,
      required: true,
    },
  },
  emits: ['task-completed-toggle']
});
</script>