<template>
  <div class="message">
    <div class="user-meta">
      <div
        class="user-color"
        :style="`background: ${color(user.username)}`"
      ></div>
      <div class="user-profile-picture" :style="`background: #eee;`"></div>
      <div class="user-info">
        <p class="user-name">{{ user.username }}</p>
        <p class="user-rank">{{ user.admin ? "Admin" : "Membre" }}</p>
      </div>
    </div>
    <div class="message-main">
      <div class="message-meta">
        <span class="message-publish-date">{{
          formatDate(post.created_date)
        }}</span>
        <span class="message-edit-date">{{
          formatDate(post.modified_date)
        }}</span>
        <img
          class="message-settings"
          @click="deletePost(post.id)"
          src="@/assets/trash.svg"
        />
      </div>
      <div class="message-content">
        {{ post.text }}
      </div>
    </div>
    <!-- <div id="delete-image">
      <img
        id="delete-button"
        @click="deletePost(post.id)"
        src="../../src/assets/trash.png"
      />
    </div> -->
  </div>
</template>

<script lang="ts">
import { usePosts } from "@/use/usePosts";
import moment from "moment";

moment.locale("fr");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default {
  methods: {
    formatDate: (dateStr) => {
      if (!dateStr) return "";
      return capitalizeFirstLetter(moment(dateStr).fromNow());
    },
    color: (str) => {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      var colour = "#";
      for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xff;
        colour += ("00" + value.toString(16)).substr(-2);
      }
      return colour;
    },
  },
  props: {
    post: Object,
    user: Object,
  },

  setup() {
    const { deletePost } = usePosts();

    return {
      deletePost,
    };
  },
};
</script>

<style scoped>
.message {
  background: white;
  border-radius: 8px;
  position: relative;
  display: flex;
  overflow: hidden;
  font-family: "Maven Pro", Arial, Helvetica, sans-serif;
  padding: 0px 20px 20px 0px;
}

.user-color {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 46px;
  border-bottom-right-radius: 8px;
}

.user-profile-picture {
  position: relative;
  width: 71px;
  height: 71px;
  display: inline-block;
  outline: 5px solid #ffffff;
  border-radius: 6px;
}

.user-name,
.user-rank {
  position: relative;
  margin: 0;
}

.user-meta {
  min-width: 132px;
  position: relative;
  text-align: center;
  padding-top: 23px;
}

.user-info {
  margin-top: 15px;
}

.user-name {
  font-family: "Fugaz One", Arial, Helvetica, sans-serif;
  text-transform: uppercase;
}

.user-rank {
  padding-top: 5px;
}

.message {
  margin-bottom: 1.5em;
  position: relative;
}

.message-main {
  flex: 1;
}

.message-meta {
  height: 46px;
  padding-left: 1em;
  font-size: 12px;
  font-weight: 500;
  color: #666;
  height: 48px;
  line-height: 48px;
  position: relative;
}

.message-settings {
  position: absolute;
  top: 13px;
  right: 0px;
  cursor: pointer;
}

.message-content {
  margin-top: 5px;
}

.message-content p {
  margin-top: 0px;
}

.message-meta > p {
  margin: 0;
}

#delete-button {
  height: 25px;
  cursor: pointer;
  text-align: right;
  opacity: 0.5;
}

#delete-button:hover {
  opacity: 1;
}

#delete-image {
  text-align: right;
  right: 10px;
  top: 10px;
  position: absolute;
  cursor: pointer;
}
</style>
