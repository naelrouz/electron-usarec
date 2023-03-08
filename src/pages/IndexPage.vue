<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-gutter-sm">
      <p>counter: {{ counterStore.counter }}</p>
      <p>doubleCount: {{ counterStore.doubleCount }}</p>
      <q-btn @click="counterStore.increment()">increment</q-btn>
    </div>

    <q-btn @click="doAThing">doAThing</q-btn>
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { useCounterStore } from 'stores/example-store';

import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { ref } from 'vue';

const counterStore = useCounterStore();

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1',
  },
  {
    id: 2,
    content: 'ct2',
  },
  {
    id: 3,
    content: 'ct3',
  },
  {
    id: 4,
    content: 'ct4',
  },
  {
    id: 5,
    content: 'ct5',
  },
]);
const meta = ref<Meta>({
  totalCount: 1200,
});

const doAThing = () => {
  const res = window.myAPI.doAThing();

  debugger;
};
</script>
