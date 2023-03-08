<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-page-container
    q-page.row.items-center.justify-evenly
      q-list(bordered)
        template(v-for="menuParentItem in menu")
          q-item-label(v-if="menuParentItem.header" header) {{ menuParentItem.header }}
          template(v-for="menuItem in menuParentItem.items")
            template(v-if="!menuItem.children?.length")
              q-item(clickable v-ripple)
                q-item-section(avatar)
                  q-icon(:name="menuItem.icon")
                q-item-section {{ menuItem.title }}
            template(v-else)
              q-expansion-item(
                :icon="menuItem.icon"
                :label=" menuItem.title"
                :content-inset-level="1")
                q-item(v-for="menuChildItem in menuItem.children" clickable v-ripple)
                  q-item-section(avatar)
                    q-icon(:name="menuChildItem.icon")
                  q-item-section {{ menuChildItem.title }}
          q-separator
</template>

<script setup lang="ts">
import { electronApi } from 'src/api/electron-api';

import { useCounterStore } from 'stores/example-store';

// import { Todo, Meta } from 'components/models';
// import ExampleComponent from 'components/ExampleComponent.vue';

import { ref, onMounted } from 'vue';

const counterStore = useCounterStore();

// const MenuTypes = {
//   link: 'link',
//   action: 'action',
//   separator: 'separator',
//   subMenu: 'sub-menu',
// };

const userInfo = ref();

const menu = [
  {
    header: 'Record',
    items: [
      {
        id: 'menu-item-record-new',
        title: 'New',
        icon: 'add',
        path: { name: 'new-record' },
      },
      {
        title: 'Open',
        icon: 'mdi-export-variant',
        // click: async () => {
        //   const path = await record.open();
        //   if (!path) return;

        //   record.play(path);
        //   await settings.addRecent(path);
        //   await this.updateRecent();
        // },
      },
      {
        id: 'menu-item-recent-list',
        title: 'Recent',
        icon: 'history',
        children: [
          {
            id: 'menu-item-record-new',
            title: 'New',
            icon: 'add',
            path: { name: 'new-record' },
          },
        ],
      },
    ],
  },
  {
    header: 'Application',
    items: [
      {
        id: 'menu-item-configuration',
        title: 'Configure',
        icon: 'settings',
        path: { name: 'configuration' },
      },
      {
        title: 'About',
        icon: 'info',
      },
    ],
  },
  {
    items: [
      {
        title: 'Quit',
        icon: 'close',
        click: () => electronApi.quit(),
      },
    ],
  },
];

onMounted(async () => {
  userInfo.value = await electronApi.getUserInfo();
});
</script>
