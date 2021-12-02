import {reactive, computed, UnwrapRef, ComputedRef} from 'vue'

import app from '@/feathers-client'
import CategoryModel from "@/models/CategoryModel";
import topic from "@/views/Topic.vue";
import {protocol} from "socket.io-client";
import {usePosts} from "@/use/usePosts";

export default interface Topic {
  id : number;
  subject: string;
  categoryId: number;
}

interface CategoryState {
  categoryReady: boolean;
  topics: {[id: number]: Topic};
}

interface TopicState extends Topic{
  topicReady: boolean;
}

const categoriesState: CategoryState[] = [];

const topicsState: TopicState[] = [];

app.service('topics').on('created', async (topic: Topic) => {
  console.log('TOPICS EVENT created', topic)
  categoriesState[topic.categoryId].topics[topic.id] = topic
})

app.service('topics').on('patched', (topic: Topic) => {
  console.log('TOPICS EVENT patched', topic)
  categoriesState[topic.categoryId].topics[topic.id] = topic
})

app.service('topics').on('removed', (topic: Topic) => {
  console.log('TOPICS EVENT removed', topic)
  delete categoriesState[topic.categoryId].topics[topic.id]
})

const categoryReady = category => {
  if(!categoriesState[category]) {
    categoriesState[category] = reactive({
      categoryReady: false,
      topics: {}
    });
  }
  return categoriesState[category].categoryReady;
}

const topicReady = topicId => {
  if(!topicsState[topicId]) {
    topicsState[topicId] = reactive({
      topicReady: false,
      id: -1,
      subject: "",
      categoryId: -1
    });
  }
  return topicsState[topicId].topicReady;
}

const topicList = category => computed(() => {
  if(!categoryReady(category)) {
    app.service('topics').find({
      query: {
        categoryId: category
      }
    }).then((list: Topic[]) => {
      list.forEach(topic => { categoriesState[category].topics[topic.id] = topic })
      categoriesState[category].categoryReady = true
    })
    return []
  }
  return Object.values(categoriesState[category].topics)
})

const getTopic = topicId => computed(() => {
  if(!topicReady(topicId)) {
    app.service('topics').get(topicId).then(topic => {
      topicsState[topicId].categoryId = topic.categoryId;
      topicsState[topicId].id = topic.id;
      topicsState[topicId].subject = topic.subject;
      topicsState[topicId].topicReady = true;
    })
    return {};
  }
  return topicsState[topicId];
});

const addTopic = (subject: string, categoryId: number, authorId: number) => {
  app.service('topics').create({ subject: subject, categoryId: categoryId, authorId: authorId })
}

const deleteTopic = (id: number) => {
  app.service('topics').remove(id)
}

const topicsCount = (categoryId: number) => {
  return topicList(categoryId).value.length;
}

const totalPostsCount = (categoryId: number) => {
  const { postsCount } = usePosts();
  let count = 0;
  topicList(categoryId).value.forEach((topic) => count += postsCount(topic.id));
  return count;
}

export function useTopics() {
  return {
    topicList, getTopic, addTopic, deleteTopic, topicsCount, totalPostsCount
  }
}
