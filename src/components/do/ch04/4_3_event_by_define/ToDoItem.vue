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

<script lang="ts" setup>
import { defineProps, type PropType } from 'vue';
import type { Task } from '@/components/do/ch04/type/Class';
// emit 타입 선언
type EmitEvents={
  (e: 'task-completed-toggle',task: Task): void;
};

const emits = defineEmits<EmitEvents>()
//const emits = defineEmits(['task-completed-toggle']);

const props = defineProps({
  task:{
    type: Object as PropType<Task>,
      required: true,
  }
})

const  onTaskCompleted = (event: Event) =>{
  emits("task-completed-toggle",{
    id: props.task.id,
    title: props.task.title,
    completed: (event.target as HTMLInputElement)?.checked,
  });
}
</script>