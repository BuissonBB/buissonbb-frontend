import { reactive, computed } from 'vue'

import app from '@/feathers-client'

export default interface Chat {
  id : number;
  title: string;
}

interface ChatState {
  chatsListReady: boolean;
  chats: {[id: string]: Chat};
}

const chatsState: ChatState = reactive({
  chatsListReady: false,
  chats: {}
})

app.service('chats').on('created', async (chat: Chat) => {
  console.log('CHATS EVENT created', chat)
  chatsState.chats[chat.id] = chat
})

app.service('chats').on('patched', (chat: Chat) => {
  console.log('CHATS EVENT patched', chat)
  chatsState.chats[chat.id] = chat
})

app.service('chats').on('removed', (chat: Chat) => {
  console.log('CHATS EVENT removed', chat)
  delete chatsState.chats[chat.id]
})

const chatsList = computed(() => {
  if (!chatsState.chatsListReady) {
    app.service('chats').find({}).then((list: Chat[]) => {
      list.forEach(chat => { chatsState.chats[chat.id] = chat })
      chatsState.chatsListReady = true
    })
    return []
  }
  return Object.values(chatsState.chats)
})

const addChat = (title: string) => {
  app.service('chats').create({ title })
}

const deleteChat = (id: number) => {
  app.service('chats').remove(id)
}

export function useChats() {
  return {
    chatsList, addChat, deleteChat
  }
}
