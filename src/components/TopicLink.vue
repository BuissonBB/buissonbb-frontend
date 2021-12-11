<template>

<router-link
  :to="{ name: 'Topic', params: { topic: topic.id } }"
>

  <a class="category" href="#" style="height: 40px; line-height: 40px">
    {{ topic.subject }} | {{ postsCount(topic.id) }} posts
  </a>
</router-link>
<button style="margin-left: 20px; float: right; position: absolute; right: 30px; top: 15px;" @click="deleteTopic(topic.id)" >
  DELETE
</button>
</template>


<style>
"position: relative;
</style>
