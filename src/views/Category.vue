<template>
  <h2 id="category-title">
    {{ category && category.name }}
    <img
      id="category-icon"
      :src="category && asset(category.icon)"
      style="margin-right: 30px"
    />
  </h2>
  <p id="category-description">{{ category && category.description }}</p>

  <div class="new-chat" style="margin-top: 3em">
        <label>
      New Topic title
      <input class="chat-title-input" type="text" v-model="newTopicTitle" placeholder="Select a new topic title" />
    </label>

    <button @click="addTopic(newTopicTitle, route.params.category, 1)" style="margin-left: 1em;">
      OPEN NEW TOPIC
    </button>
  </div>

  <!--- COMPONENT TOPIC ICI -->

  <div class="categories" style="margin-top: 3em" v-if="topicList.length > 0">
    <div
      class="left-border"
      :style="`background: ${category.section.color};`"
    ></div>
    <router-link
      v-for="topic in topicList"
      :key="topic.id"
      :to="{ name: 'Topic', params: { topic: topic.id } }"
    >
      <!--- COMPONENT CATEGORY ICI -->
      <a class="category" href="#" style="height: 40px; line-height: 40px">
        {{ topic.subject }} | {{ postsCount(topic.id) }} posts 
                <button style="margin-left: 20px; float: right;" @click="deleteTopic(topic.id)" >
        DELETE
      </button>
      </a>


      <!--- FIN COMPONENT -->
    </router-link>
  </div>

  <div v-if="topicList.length === 0" id="no-topics" style="margin-top: 3em">
    There are not topic in this category. Be the first to open one!
  </div>

  <!--- FIN COMPONENT -->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { useTopics } from "@/use/useTopics";
import { useForumConfig } from "@/use/useForumConfig";

import { useRoute } from "vue-router";
import { asset } from "@/settings";
import { usePosts } from "@/use/usePosts";

export default defineComponent({
  methods: {
    asset,
  },
  setup() {
    const route = useRoute();

    const newTopicTitle = ref("");

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

<style scoped>
#category-title {
  text-transform: uppercase;
  font-size: 40px;
  color: #333;
}

#category-icon {
  vertical-align: bottom;
  margin-left: 1em;
}

#category-description {
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #666666;
}

.chat-title-input {
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
