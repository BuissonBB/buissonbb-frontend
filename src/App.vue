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
  margin: 0px 0px 50px 0px;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  background-color: #F2F2F2;
}

button {
  font-size: 18px;
  text-transform: uppercase;
  background-color: #27AE60;
  color: white;
  border-radius: 4px;
  border: none;
  height: 41px;
  min-width: 120px;
  cursor: pointer;
}

#main {
    max-width: 974px;
    margin: auto;
    margin-top: 8em;
}

.left-border {
    position: absolute;
    left: 0px;
    width: 13px;
    top: -10px;
    bottom: -10px;
    border-radius: 10px 0 10px 0;
}
</style>
