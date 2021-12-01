<template>
  <h1>Forum {{ $route.params.category }}</h1>
  <p>{{ topicList }}</p>
  <p>{{ category.name }}</p>
  <p>{{ category.description }}</p>
  <img :src="asset(category.icon)"/>

  <br/>
  <span>LISTE DES TOPICS</span>
  <br/>

  <router-link v-for="topic in topicList" :key="topic.subject" :to="{ name: 'Topic', params: { topic: topic.id } }">
    <!--- COMPONENT TOPIC ICI -->
    <a class="topic" href="#">
      {{ topic.subject }}
    </a>
    <br/>
    <!--- FIN COMPONENT -->
  </router-link>

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
      topicList: topicList(route.params.category),
      category: category(route.params.category),
    };
  },
});
</script>
