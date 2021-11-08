<template>
  <div class="message">
    <p class="bubble">{{ msg }}
        <button @click="deleteMessage(message.id)">
            <img src="../../public/img/icons/trash.png"/>
        </button>
    </p>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

import { Options, Vue } from 'vue-class-component'
import { useMessages } from '../use/useMessages'

@Options({
  props: {
    msg: String
  }
})
export default class Message extends Vue {
  msg!: string
  
  setup() {
    const { messagesList, deleteMessage } = useMessages()

    const messageText = ref('')

    return {
      messagesList,
      deleteMessage,
      messageText
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

p {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: white;
}

.bubble {
    display: flex;
    justify-content: space-between;
	border-radius: 1em;
	padding: 0.5em 1em;
	margin-top: 0.3em;
	max-width: 30%;
    background-color: cornflowerblue;
}
</style>
