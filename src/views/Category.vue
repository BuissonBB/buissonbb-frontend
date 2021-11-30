<template>
  <h1>Forum {{ $route.params.category }}</h1>
  <p>{{ topicList }}</p>
  <p>{{ category.name }}</p>
  <img :src="asset(category.icon)"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useTopics } from "@/use/useTopics";
import { useForumConfig } from "@/use/useForumConfig";

import { useRoute } from "vue-router";
import { asset } from "@/settings";

export default defineComponent({
  methods: {
    asset,
  },
  setup() {
    const route = useRoute();

    const { topicList } = useTopics();
    const { category } = useForumConfig();

    return {
      topicList: topicList(0),
      category: category(route.params.category),
    };
  },
});
</script>