<template>
<router-link :to="{ name: 'Topic', params: { topic: topic.id } }">
  <a class="category" href="#" style="height: 40px; line-height: 40px">
    {{ topic.subject }} | {{ postsCount(topic.id) }} posts
  </a>
</router-link>

<button @click="deleteTopic(topic.id)" >
  DELETE
</button>
</template>


<script lang="ts">
import { usePosts } from "@/use/usePosts";
import { useTopics } from "@/use/useTopics"
import moment from "moment";

moment.locale('fr');

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
    const { postsCount } = usePosts();
    const { deleteTopic } = useTopics();

    return {
      postsCount,
      deleteTopic
    };
  },
};
</script>


<style>
button {
  margin-left: 20px;
  position: absolute;
  right: 30px;
  top: 15px;
}

</style>
