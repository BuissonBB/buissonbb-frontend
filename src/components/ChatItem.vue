<template>
    <button class="chat-item">{{ title }}</button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    title: String
  }
})
export default class ChatButton extends Vue {
  title!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-item {
  width: 96%;
  height: 5%;
  margin: 2%;
  padding: 2%;
  text-align: left;
  cursor: pointer;
  border: none;
  background-color: rgb(185, 185, 185);
  border-radius: 5px;
}

.chat-item:hover {
  background-color: rgb(150, 150, 150);
}
</style>
