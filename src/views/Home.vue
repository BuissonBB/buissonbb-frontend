<template>
  <div class="topic">
    <div v-if="structure">
      <div v-for="section in structure.sections" :key="section.name">
        <Section :name="section.name" :icon="section.icon" :color="section.color" :categories="section.categories"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import AppBar from '@/components/AppBar.vue';
import Section from '@/components/Section.vue';

import { useForumConfig } from "@/use/useForumConfig";

export default {
  setup () {
    const { structure } = useForumConfig();

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
