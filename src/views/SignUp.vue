<template>
  <div id="form">
    <div id="form-head">
      <h1 id="head-title">
        Sign Up <img src="@/assets/signup.svg" id="head-icon" />
      </h1>
    </div>
    <div id="form-main">
      <div class="left-border" style="background: #27ae60"></div>
      <form>
        <div class="form-block">
          <label for="email">Username</label>
          <input type="email" id="email" name="email" />
        </div>
        <div class="form-block">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" />
        </div>
        <div class="form-block">
          <label for="email">Password</label>
          <input type="email" id="password_1" name="password" />
        </div>
        <div class="form-block">
          <label for="email">Password (again)</label>
          <input type="email" id="password_2" name="password" />
        </div>
        <div class="centered">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUsers } from "@/use/userUsers";

export default defineComponent({
  setup() {
    const { register } = useUsers();
    register("test", "test@gmail.com", "test");
  },
});
</script>

<style scoped src="@/assets/styles/sign.css">
</style>