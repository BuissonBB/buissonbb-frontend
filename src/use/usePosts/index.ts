import { reactive, computed } from 'vue'

import app from '@/feathers-client'
import Topic from "@/use/useTopics";

interface Post {
  id : number;
  text: string;
  topicId: number;
  authorId: number;
}

interface PostState {
  postsListReady: boolean;
  posts: {[id: string]: Post};
}

const postsState: PostState[] = [];

app.service('posts').on('created', async (post: Post) => {
  console.log('POSTS EVENT created', post)
  postsState[post.topicId].posts[post.id] = post
})

app.service('posts').on('patched', (post: Post) => {
  console.log('POSTS EVENT patched', post)
  postsState[post.topicId].posts[post.id] = post
})

app.service('posts').on('removed', (post: Post) => {
  console.log('POSTS EVENT removed', post)
  delete postsState[post.topicId].posts[post.id]
})

const postStateReady = topic => {
  if(!postsState[topic]) {
    postsState[topic] = reactive({
      postsListReady: false,
      posts: {}
    });
  }
  return postsState[topic].postsListReady;

}


const postList = topic => computed(() => {
  if(!postStateReady(topic)) {
    app.service('posts').find({
      query: {
        topicId: topic
      }
    }).then((list: Post[]) => {
      list.forEach(post => {
        postsState[topic].posts[post.id] = post
      })
      postsState[topic].postsListReady = true
    })
    return []
  }
  return Object.values(postsState[topic].posts)
})

const addPost = (text: string, topicId: number, authorId: number) => {
  app.service('posts').create({ text, topicId, authorId })
}

const deletePost = (id: number) => {
  app.service('posts').remove(id)
}

export function usePosts () {
  return {
    postList, addPost, deletePost
  }
}
