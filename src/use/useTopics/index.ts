import {reactive, computed, UnwrapRef, ComputedRef} from 'vue'

import app from '@/feathers-client'
import CategoryModel from "@/models/CategoryModel";
import topic from "@/views/Topic.vue";
import {protocol} from "socket.io-client";

export default interface Topic {
  id : number;
  subject: string;
  categoryId: number;
}

interface TopicState {
  topicsListReady: boolean;
  topics: {[id: number]: Topic};
}

const topicsState: TopicState[] = [];

app.service('topics').on('created', async (topic: Topic) => {
  console.log('TOPICS EVENT created', topic)
  topicsState[topic.categoryId].topics[topic.id] = topic
})

app.service('topics').on('patched', (topic: Topic) => {
  console.log('TOPICS EVENT patched', topic)
  topicsState[topic.categoryId].topics[topic.id] = topic
})

app.service('topics').on('removed', (topic: Topic) => {
  console.log('TOPICS EVENT removed', topic)
  delete topicsState[topic.categoryId].topics[topic.id]
})

const topicStateReady = category => {
  if(!topicsState[category]) {
    topicsState[category] = reactive({
      topicsListReady: false,
      topics: {}
    });
  }
  return topicsState[category].topicsListReady;
}

const topicList = category => computed(() => {
  if(!topicStateReady(category)) {
    app.service('topics').find({
      query: {
        categoryId: category
      }
    }).then((list: Topic[]) => {
      list.forEach(topic => { topicsState[category].topics[topic.id] = topic })
      topicsState[category].topicsListReady = true
    })
    return []
  }
  return Object.values(topicsState[category].topics)
})

const addTopic = (subject: string, categoryId: number, authorId: number) => {
  app.service('topics').create({ subject: subject, categoryId: categoryId, authorId: authorId })
}

const deleteTopic = (id: number) => {
  app.service('topics').remove(id)
}

const topicsCount = (categoryId: number) => {
  return topicList(categoryId).value.length;
}

export function useTopics() {
  return {
    topicList, addTopic, deleteTopic, topicsCount
  }
}
