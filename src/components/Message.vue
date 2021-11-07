<template>
  <div class="message">
    <p class="bubble">{{ msg }}</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    msg: String
  }
})
export default class Message extends Vue {
  msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

p {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: white;
}

.bubble {
    display: flex;
	border-radius: 1em;
	padding: 0.5em 1em;
	margin: 0.0625em;
	max-width: 30%;
    background-color: cornflowerblue;
}
</style>
