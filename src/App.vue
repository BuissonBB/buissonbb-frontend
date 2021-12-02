<template>
  <AppBar></AppBar>
  <div id="main">
    <router-view/>
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
