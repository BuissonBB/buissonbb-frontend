<template>
  <div class="content">
    <div class="chat">
      <ul>
        <li v-for="message in messagesList">
          <Message :msgText=message.text :msgId=message.id :deleteMessageFunction=deleteMessage></Message>
        </li>
      </ul>
      <div v-if="messagesList.length === 0">
        Aucun message présent dans ce chat
      </div>
    </div>
    <div class="chatbar">
      <hr/>
      <label>
        <input type="text" placeholder="Envoyer un message" id="inputChat" v-on:keyup="isInputEmpty" v-on:keyup.enter="sendMessage" v-model="messageText"/>
      </label>
      <button @click=sendMessage id="send" disabled>Envoyer</button>
    </div>
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
    sendMessage: function () {
      var inputChat = document.getElementById("inputChat")
      if (inputChat.value != "") {
        this.addMessage(this.messageText, 1, 0);
        this.messageText = ''
        document.getElementById("inputChat").focus()
        document.getElementById("send").disabled = true
      }
    },

    isInputEmpty: function() {
      var inputChat = document.getElementById("inputChat")
      var sendButton = document.getElementById("send")
      if (inputChat.value == "") {
        sendButton.disabled = true
      } else {
        sendButton.disabled = false
      }
    }
  },

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

.chatbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-bottom: 1em;
}

.chatbar {
  bottom: 0;
  width: 100%;
  padding-bottom: 1em;
  height: 10vh;
}

.chat {
  overflow:scroll;
  overflow-x: hidden;
  height: 75vh;
}
</style>
