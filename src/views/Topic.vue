<template>
  <h1>TOPIC {{ $route.params.topic }}</h1>
  <p>{{ postList }}</p>
  <p>{{ topic.subject}}</p>

  <br/>
  <span>LISTE DES POSTS</span>
  <br/>
  <br/>

    <!--- COMPONENT POST ICI -->
    <p class="post" v-for="post in postList" :key="post.id">
      POST ID : {{ post.id }} : {{ post.text }}
    </p>
    <br/>

    <!--- FIN COMPONENT -->
  <div class="chatbar">
    <hr/>
    <label>
      <input type="text" placeholder="Envoyer un message" id="inputChat" v-on:keyup="isInputEmpty" v-on:keyup.enter="sendPost" v-model="messageText"/>
    </label>
    <button @click=sendPost id="send" disabled>Envoyer</button>
  </div>

</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
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

    const { postList, addPost, deletePost } = usePosts();
    const { category } = useForumConfig();

    const messageText = ref('')

    function sendPost() {
      const inputChat = document.getElementById("inputChat") as HTMLInputElement;
      if (inputChat.value !== "") {
        addPost(messageText.value, Number(route.params.topic), 1);
        messageText.value = '';
        inputChat.focus();
        const sendButton = document.getElementById("send") as HTMLInputElement;
        sendButton.disabled = true;
      }
    }

    function isInputEmpty() {
      const inputChat = document.getElementById("inputChat") as HTMLInputElement;
      const sendButton = document.getElementById("send") as HTMLInputElement;
      sendButton.disabled = inputChat.value === "";
    }

    return {
      postList: postList(route.params.topic),
      topic: category(route.params.topic),
      sendPost,
      isInputEmpty,
      messageText,
    };
  },
});
</script>
