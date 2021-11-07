<template>
  <div>
    <ul>
      <li v-for="message in messagesList">
        <span><button @click="deleteMessage(message.id)" id="retirer">Retirer</button></span>
        <Message :msg=message.text></Message>
      </li>
    </ul>
    <div v-if="messagesList.length === 0">
      Aucun message présent dans ce chat
    </div>
  </div>
  <div class="chatbar">
    <hr/>
    <label>
      <input type="text" placeholder="Envoyer un message" v-on:keyup.enter="clickSend()" v-model="messageText"/>
    </label>
    <button @click="addMessage(messageText, 1, 0)" id="send">Envoyer</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useMessages } from '../use/useMessages'
import Message from '@/components/Message.vue'

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
  },

  methods: {
    clickSend: function () {
        document.getElementById("send").click();
    }
  }, //test

  components: {
    Message
  } 
}
</script>

<style>
li {
  list-style: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#retirer {
  background-color: tomato;
  display: flex;
  border-radius: 0.5em;
  padding: 0.25em 0.5em;
  font-size: 0.6em;
  
}

.chatbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-bottom: 1em;
}
</style>
