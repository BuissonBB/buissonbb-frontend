<template>
  <div id="form">
    <div id="form-head">
      <h1 id="head-title">Sign In <img src="@/assets/signin.svg" id="head-icon"/></h1>
    </div>
    <div id="form-main">
      <div class="left-border" style="background: #27AE60;"></div>
      <form>
        <div class="form-block">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email">
        </div>
        <div class="form-block">
          <label for="email">Password</label>
          <input type="email" id="password" name="password">
        </div>
        <div class="form-inline">
          <label for="email">Remember Me</label>
          <input type="checkbox" id="remember" name="remember"/>
        </div>
        <div class="centered">
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped src="@/assets/styles/sign.css">
</style>