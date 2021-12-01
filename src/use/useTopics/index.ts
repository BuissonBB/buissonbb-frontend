import { reactive, computed } from 'vue'

import app from '@/feathers-client'

export default interface Topic {
  id : number;
  subject: string;
  categoryId: number;
}

interface TopicState {
  topicsListReady: boolean;
  topics: {[id: number]: Topic};
}

const topicsState: TopicState = reactive({
  topicsListReady: false,
  topics: {}
})

app.service('topics').on('created', async (topic: Topic) => {
  console.log('TOPICS EVENT created', topic)
  topicsState.topics[topic.id] = topic
})

app.service('topics').on('patched', (topic: Topic) => {
  console.log('TOPICS EVENT patched', topic)
  topicsState.topics[topic.id] = topic
})

app.service('topics').on('removed', (topic: Topic) => {
  console.log('TOPICS EVENT removed', topic)
  delete topicsState.topics[topic.id]
})

const topicList = category => computed(() => {
  if (!topicsState.topicsListReady) {
    app.service('topics').find({category}).then((list: Topic[]) => {
      list.forEach(topic => { topicsState.topics[topic.id] = topic })
      topicsState.topicsListReady = true
    })
    return []
  }
  return Object.values(topicsState.topics)
})

const addTopic = (subject: string) => {
  app.service('topics').create({ subject })
}

export function useTopics() {
  return {
    topicList, addTopic
  }
}
