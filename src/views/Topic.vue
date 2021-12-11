<template>
  <div id="title-background"></div>

  <h2 id="topic-subject">{{ topic.subject }}</h2>

  <Post v-for="post in postList" :key="post.id" :post="post" :user="post.user"></Post>

  <div v-if="postList.length === 0" id="no-posts" style="margin-top: 5em">
    There is not post in this topic. Be the first to send one!
  </div>

  <br/>

  <div class="chat-bar">
    <label>
      <input type="text" placeholder="Write a message" id="inputChat" v-on:keyup="isInputEmpty" v-on:keyup.enter="sendPost" v-model="messageText"/>
    </label>
    <button @click=sendPost id="send" disabled>Send</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useRoute} from "vue-router";
import { asset } from "@/settings";
import {usePosts} from "@/use/usePosts";
import {useTopics} from "@/use/useTopics";
import Post from "@/components/Post.vue";

export default defineComponent({
  components: {
    Post
  },

  methods: {
    asset,
  },
  setup() {
    const route = useRoute();

    const { getTopic } = useTopics();
    const { postList, addPost } = usePosts();

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
      isInputEmpty,
      messageText,
    };
  },
});
</script>
<style>

.chat-bar {
  background-color: #EAEAEA;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding-top: 2%;
  padding-bottom: 2%;
  text-align: center;
}

#inputChat {
  width: 50%;
  height: 40px;
  font-size: 18px;
  margin-right: 2%;
  border-radius: 5px;
  border: 1px solid grey;
  padding-left: 1%;
  padding-right: 1%;
}

#send:disabled {
  opacity: 0.5;
  cursor: default;
}

#title-background{
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 250px;
  background-color: #EAEAEA;
}

</style>
