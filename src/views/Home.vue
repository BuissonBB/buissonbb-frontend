<template>
  <div class="home">
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

    const chatTitle = ref('')

    return {
      chatsList, addChat, deleteChat,
      chatTitle,
    }
  }
}

</script>
