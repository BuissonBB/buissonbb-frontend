<template>
  <label>Chat
    <input type="text" v-model="messageText" />
  </label>
  <button @click="addMessage(messageText, 1, 0)">Ajouter</button>

  <hr/>
  <div>
    <ul>
      <li v-for="message in messagesList">
        {{ message.text }} <span><button @click="deleteMessage(message.id)">Supprimer</button></span>
      </li>
    </ul>
    <div v-if="messagesList.length === 0">
      Aucun message présent dans ce chat
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useMessages } from '../use/useMessages'

export default {
  setup () {
    const { messagesList, addMessage, deleteMessage } = useMessages()

    const messageText = ref('')

    return {
      messagesList,
      addMessage,
      deleteMessage,
      messageText
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
