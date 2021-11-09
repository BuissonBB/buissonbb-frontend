<template>
  <div class="message">
    <p class="bubble">{{ msgText }}
        <img @click="deleteMessageFunction(msgId)" src="../../public/img/icons/trash.png"/>
    </p>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    msgText: String,
    msgId: Number,
    deleteMessageFunction: Function
  }
})
export default class Message extends Vue {
  msgText!: String
  msgId!: Number
  deleteMessageFunction!: void
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
    justify-content: space-between;
	border-radius: 1em;
	padding: 0.5em 1em;
	margin-top: 0.3em;
	max-width: 30%;
    background-color: cornflowerblue;
}

img {
    height: 25px;
    height: 25px;
}
</style>
