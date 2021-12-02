<template>
  <h1>{{ topic.subject }}</h1>

  <h2>LISTE DES POSTS</h2>

    <!--- COMPONENT POST ICI -->
    <p class="post" v-for="post in postList" :key="post.id">
      >>>>>  {{ post.text }}
      <button style="margin-left: 20px" @click="deletePost(post.id)">
        DELETE
      </button>
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
import { useRoute } from "vue-router";
import { asset } from "@/settings";
import {usePosts} from "@/use/usePosts";
import {useTopics} from "@/use/useTopics";

export default defineComponent({
  methods: {
    asset,
  },
  setup() {
    const route = useRoute();

    const { getTopic } = useTopics();
    const { postList, addPost, deletePost } = usePosts();

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
      topic: getTopic(route.params.topic),
      sendPost,
      deletePost,
      isInputEmpty,
      messageText,
    };
  },
});
</script>
