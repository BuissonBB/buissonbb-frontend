<template>
  <AppBar></AppBar>
  <div id="main">
    <router-view/>
  </div>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/auth">Authentification</router-link> |
    <router-link to="/chat/0">Chat</router-link>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue';

export default {
  components: {
    AppBar
  }
}
</script>

<style>
a {
  text-decoration: none;
}
body {
  margin: 0;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  background-color: #F2F2F2;
}
#main {
    max-width: 974px;
    margin: auto;
    margin-top: 8em;
}
</style>