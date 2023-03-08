<template lang="pug">
q-layout(view='lHh Lpr lFf')
  q-page-container
    q-page.row.items-center.justify-evenly
      p Hi {{ userInfo.username }}!
      //- .q-gutter-sm
      //-   p counter: {{ counterStore.counter }}
      //-   p doubleCount: {{ counterStore.doubleCount }}
      //-   q-btn(@click='counterStore.increment()') increment
      //- q-btn(@click='doAThing') doAThing
      //- ExampleComponent(title='Example component' active='' :todos='todos' :meta='meta')
</template>

<script setup lang="ts">
import { electronApi } from 'src/api/electron-api';

import { useCounterStore } from 'stores/example-store';

// import { Todo, Meta } from 'components/models';
// import ExampleComponent from 'components/ExampleComponent.vue';
import { ref, onMounted } from 'vue';

const counterStore = useCounterStore();

const userInfo = ref();

onMounted(async () => {
  userInfo.value = await electronApi.getUserInfo();
});
</script>
