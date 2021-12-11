<template>
  <h2 id="category-title">
    {{ category && category.name }}
    <img
      id="category-icon"
      :src="category && asset(category.icon)"
      style="margin-right: 30px"
    />
  </h2>

  <img class="return-icon" src="@/assets/arrow.svg" @click="$router.go(-1)"/>

  <p id="category-description">{{ category && category.description }}</p>

  <div class="new-chat" style="margin-top: 3em" v-if="currentUser">
    <label>
      New Topic title
      <input v-on:keyup="isInputEmpty" v-on:keyup.enter="createTopic" id="chat-title-input" type="text" v-model="newTopicTitle" placeholder="Select a new topic title" />
    </label>

    <button id="createTopicButton" @click="createTopic" style="margin-left: 1em;" disabled>
      OPEN NEW TOPIC
    </button>
  </div>
  <div v-else><br/></div>

  <div v-if="topicList.length === 0" id="no-topics">
    There is no topic in this category. Be the first to open one!
  </div>

  <div class="categories" style="margin-top: 3em" v-if="topicList.length > 0">
    <div
      class="left-border"
      :style="`background: ${category.section.color}; z-index: 10;`"
    ></div>

    <TopicLink v-for="topic in topicList" :key="topic.id" :topic="topic" :user="{name: 'Thomas', color: '#3B585A', rank: 'Zouz'}"></TopicLink>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { useTopics } from "@/use/useTopics";
import { useForumConfig } from "@/use/useForumConfig";

import { useRoute } from "vue-router";
import { asset } from "@/settings";
import { usePosts } from "@/use/usePosts";
import TopicLink from "@/components/TopicLink.vue";
import app from "@/feathers-client";

export default defineComponent({

  components: {
    TopicLink
  },

  methods: {
    asset,
  },
  setup() {
    const route = useRoute();

    const newTopicTitle = ref("");

    const currentUser = ref(null);

    const auth = app.get('authentication');
    auth && auth.then(auth => currentUser.value = auth.user);

    app.addListener("authenticated", (user) => {
      currentUser.value = user;
    });

    const { topicList, addTopic, deleteTopic } = useTopics();
    const { category } = useForumConfig();
    const { postsCount } = usePosts();

    function createTopic() {
      const inputChat = document.getElementById("chat-title-input") as HTMLInputElement;
      const sendButton = document.getElementById("createTopicButton") as HTMLButtonElement;
      if (inputChat.value !== "") {
        addTopic(newTopicTitle.value, Number(route.params.category), 1);
        newTopicTitle.value = '';
        inputChat.focus();
        sendButton.disabled = true;
      }
    }

    function isInputEmpty() {
      const inputChat = document.getElementById("chat-title-input") as HTMLInputElement;
      const sendButton = document.getElementById("createTopicButton") as HTMLInputElement;
      sendButton.disabled = inputChat.value === "";
    }

    return {
      route,
      newTopicTitle,
      addTopic,
      deleteTopic,
      postsCount,
      createTopic,
      isInputEmpty,
      currentUser,
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

#chat-title-input {
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

#no-topics {
  margin-top: 3em;
}

#createTopicButton:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
