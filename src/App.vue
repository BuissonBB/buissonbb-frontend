<template>
  <router-view/>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/auth">Authentification</router-link> |
    <router-link to="/chat/0">Chat</router-link>
  </div>
</template>

<style>
a {
  text-decoration: none;
}
body {
  margin: 0;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  background-color: #F2F2F2;
}
</style>