<template>
  <div class="topic">
    <div v-if="structure">
    <div v-for="section in structure.sections" :key="section.name">
    <Section :name="section.name" :icon="section.icon" :color="section.color" :categories="section.categories"/>
    </div>
    </div>
    <!-- <p>{{ structure }}</p> -->
  </div>
</template>

<script lang="ts">

import AppBar from '@/components/AppBar.vue';
import Section from '@/components/Section.vue';
import { ref } from 'vue'
import { Options, Vue, setup } from 'vue-class-component'

import { useForumMeta } from "@/use/useForumMeta";

import CategoryModel from '@/models/CategoryModel';

// @Options({
//   components: {
//     AppBar,
//     Section
//   }
// })
// export default class TopicVue extends Vue {
//   structure = setup(() => useForumMeta());

//   created() {
//     console.log(this!.structure.get());
//   }
//   // mounted() {
//   //     const { categories } = useCategories();
//   //     //@ts-ignore
//   //     this.categories = categories;
//   //     console.log("Categories", categories);
//   // }
//     // public constructor() {
//     //     super();
//     // }
// };

export default {
  setup () {
    const { structure } = useForumMeta();

    console.log(structure);
    
    return {
      structure
    };
  },

  components: {
    AppBar,
    Section
  } 
}

</script>
