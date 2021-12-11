<template>
  <h1>
    <img :src="category && asset(category.icon)" style="margin-right: 30px"/>
    Forum {{ category && category.name }}
  </h1>
  <h3>{{ category && category.description }}</h3>

  <div class="new-chat">
    <label>
      New Topic title
      <input class="chat-title-input" type="text" v-model="newTopicTitle" placeholder="Select a new topic title" />
    </label>
    <button @click="addTopic(newTopicTitle, route.params.category, 1)" class="new-chat-button">Create Topic</button>
  </div>

  <h2>LISTE DES TOPICS</h2>

    <!--- COMPONENT TOPIC ICI -->
    <div style="margin: 30px" v-for="topic in topicList" :key="topic.id">
      <router-link :key="topic.subject" :to="{ name: 'Topic', params: { topic: topic.id } }">
        <a class="topic">
          {{ topic.subject }} | {{ postsCount(topic.id) }} posts
        </a>
      </router-link>
      <button style="margin-left: 20px" @click="deleteTopic(topic.id)">
        DELETE
      </button>
    </div>
    <!--- FIN COMPONENT -->

</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

import { useTopics } from "@/use/useTopics";
import { useForumConfig } from "@/use/useForumConfig";

import { useRoute } from "vue-router";
import { asset } from "@/settings";
import {usePosts} from "@/use/usePosts";

export default defineComponent({
  methods: {
    asset,
  },
  setup() {
    const route = useRoute();

    const newTopicTitle = ref('')

    const { topicList, addTopic, deleteTopic } = useTopics();
    const { category } = useForumConfig();
    const { postsCount } = usePosts();

    return {
      route,
      newTopicTitle,
      addTopic,
      deleteTopic,
      postsCount,
      topicList: topicList(route.params.category),
      category: category(route.params.category),
    };
  },
});
</script>

<style>
.chat-title-input {
  font-size: 18px;
  margin-left: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: transparent;
  border: 1px solid gray;
}

.new-chat {
  text-align: right;
}

.new-chat-button {
  margin: 20px;
  padding: 10px;
  border-radius: 5px;
  background-color: transparent;
  border: 1px solid gray;
  color: gray;
  cursor: pointer;
}

.new-chat-button:hover {
  background-color: gray;
  border: 1px solid gray;
  color: white;
  cursor: pointer;
}

.new-chat-button:active {
  background-color: #575757;
  border: 1px solid #575757;
  color: white;
  cursor: pointer;
}

</style>
