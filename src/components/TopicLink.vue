<template>
  <div class="topicLink">
    <router-link :to="{ name: 'Topic', params: { topic: topic.id } }">
      <a class="category" href="#" style="height: 40px; line-height: 40px">
        {{ topic.subject }} | {{ postsCount(topic.id) }} post(s)
      </a>
    </router-link>
    <button class="deleteTopic" @click="deleteTopic(topic.id)" v-if="currentUser && currentUser.admin">
      DELETE
    </button>
  </div>
</template>


<script lang="ts">
import { usePosts } from "@/use/usePosts";
import { useTopics } from "@/use/useTopics"
import moment from "moment";
import {ref} from "vue";
import app from "@/feathers-client";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default {
  methods: {
    formatDate: (dateStr) => {
      if(!dateStr) return "";
      return capitalizeFirstLetter(moment(dateStr).fromNow());
    }
  },
  props: {
    topic: Object,
    user: Object,
  },

  setup() {
    const currentUser = ref(null);

    const auth = app.get('authentication');
    auth && auth.then(auth => currentUser.value = auth.user);

    app.addListener("authenticated", (user) => {
      currentUser.value = user;
    });

    const { postsCount } = usePosts();
    const { deleteTopic } = useTopics();

    return {
      postsCount,
      deleteTopic,
      currentUser
    };
  },
};
</script>

<style>
  .deleteTopic {
    position: absolute;
    margin-left: 20px;
    right: 30px;
    top: 15px;
  }

  .topicLink {
    position: relative;
  }
</style>
