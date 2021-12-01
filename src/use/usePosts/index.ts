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

const postsState: PostState = reactive({
  postsListReady: false,
  posts: {}
})

app.service('posts').on('created', async (post: Post) => {
  console.log('POSTS EVENT created', post)
  postsState.posts[post.id] = post
})

app.service('posts').on('patched', (post: Post) => {
  console.log('POSTS EVENT patched', post)
  postsState.posts[post.id] = post
})

app.service('posts').on('removed', (post: Post) => {
  console.log('POSTS EVENT removed', post)
  delete postsState.posts[post.id]
})

const postList = topic => computed(() => {
  if (!postsState.postsListReady) {
    app.service('posts').find({topic}).then((list: Post[]) => {
      list.forEach(post => { postsState.posts[post.id] = post })
      postsState.postsListReady = true
    })
    return []
  }
  return Object.values(postsState.posts)
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
