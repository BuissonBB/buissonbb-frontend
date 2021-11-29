<template>
  <AppBar></AppBar>
  <div class="topic">
    <h1>Topic</h1>
  </div>
</template>

<script lang="ts">

import { ref } from 'vue'
import AppBar from '@/components/AppBar.vue';
import { Options, Vue } from 'vue-class-component'

import { useCategories } from "@/use/useCategories";


@Options({
  components: {
    AppBar
  }
})
export default class TopicVue extends Vue {
    public constructor() {
        super();
        const { categories } = useCategories();
        console.log("Categories", categories);
    }
};

</script>
