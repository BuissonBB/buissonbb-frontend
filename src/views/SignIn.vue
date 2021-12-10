<template>
  <div id="form">
    <div id="form-head">
      <h1 id="head-title">
        Sign In <img src="@/assets/signin.svg" id="head-icon" />
      </h1>
    </div>
    <div id="form-main">
      <div class="left-border" style="background: #27ae60"></div>
      <form @submit="login" method="POST">
        <div class="form-block">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" v-model="loginForm.email" />
        </div>
        <div class="form-block">
          <label for="email">Password</label>
          <input type="password" id="password" name="password" v-model="loginForm.password" />
        </div>
        <div class="form-inline">
          <label for="email">Remember Me</label>
          <input type="checkbox" id="remember" name="remember" />
        </div>
        <div class="centered">
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import app from "@/feathers-client";

export default defineComponent({
  setup() {
    const loginForm = ref({
      email: "",
      password: "",
      hasError: false,
    });

    return {
      loginForm,
    };
  },

  methods: {
    login: async function (e: Event) {
      e.preventDefault();
      console.log("login", this.loginForm)

      this.loginForm.hasError = false;
      try {
        try {
          await app.logout();
        }catch(error: any) {
          console.log(error);
        }
        await app.authenticate({
          strategy: "local",
          email: this.loginForm.email,
          password: this.loginForm.password,
        });
        this.loginForm.email = "";
        this.loginForm.password = "";
        await this.$router.push("/");
      } catch (error: any) {
        console.log(error);
        // if (error.code === 401)
        //   this.messageState.displayError(
        //     "Utilisateur ou mot de passe incorrect."
        //   );
        // else this.messageState.displayError("Impossible de se connecter.");
        // this.loginForm.hasError = true;
      }
    },
  },
});
</script>

<style scoped src="@/assets/styles/sign.css">
</style>