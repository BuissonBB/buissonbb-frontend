import { reactive, computed } from 'vue'

import app from '@/feathers-client'

interface Message {
  id : number;
  text: string;
  chatId: number;
  author: number;
}

interface MessageState {
    messagesListReady: boolean;
    messages: {[id: string]: Message};
}

const messagesState: MessageState = reactive({
  messagesListReady: false,
  messages: {}
})

app.service('messages').on('created', async (message: Message) => {
  console.log('MESSAGES EVENT created', message)
  messagesState.messages[message.id] = message
})

app.service('messages').on('patched', (message: Message) => {
  console.log('MESSAGES EVENT patched', message)
  messagesState.messages[message.id] = message
})

app.service('messages').on('removed', (message: Message) => {
  console.log('MESSAGES EVENT removed', message)
  delete messagesState.messages[message.id]
})

const messagesList = computed(() => {
  if (!messagesState.messagesListReady) {
    app.service('messages').find({}).then((list: Message[]) => {
      list.forEach(message => { messagesState.messages[message.id] = message })
      messagesState.messagesListReady = true
    })
    return []
  }
  return Object.values(messagesState.messages)
})

const addMessage = (text: string, chatId: number, author: number) => {
  app.service('messages').create({ text, chatId, author })
}

const deleteMessage = (id: number) => {
  app.service('messages').remove(id)
}

export function useMessages () {
  return {
    messagesList, addMessage, deleteMessage
  }
}
