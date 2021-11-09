<template>
  <div class="home">
    <div class="new-chat">
      <label>
        New chat title
        <input type="text" v-model="newChatTitle" placeholder="Select a new chat title" />
      </label>
      <button @click="onCreateChatButtonClicked(newChatTitle)" class="new-chat-button">Create chat</button>
    </div>
    <div class="chat-list" v-for="chat in chatsList">
      <ChatItem :title="chat.title" :chatId="chat.id"/>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue"
import {useChats} from "@/use/useChat";
import ChatItem from "@/components/ChatItem.vue";

export default {
  components: {ChatItem},
  setup() {
    const { chatsList, addChat, deleteChat } = useChats()

    const newChatTitle = ref('')

    function onCreateChatButtonClicked(chatTitle: string) {
      if (chatTitle.length < 1) { // and you are an admin
        alert("The new chat title can not be empty, please fill the chat title.");
      } else {
        addChat(chatTitle)
      }
    }

    return {
      chatsList, addChat, deleteChat, onCreateChatButtonClicked,
      newChatTitle,
    }
  }
}

</script>

<style>
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
