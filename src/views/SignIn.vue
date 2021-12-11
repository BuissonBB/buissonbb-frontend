<template>
  <div id="form">
    <div id="form-head">
      <h1 id="head-title">
        Sign In <img src="@/assets/signin.svg" id="head-icon" />
      </h1>
    </div>
    <div id="form-main">
      <div class="left-border" style="background: #27ae60"></div>
      <form @submit="signin" method="POST">
        <div class="form-block">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" v-model="signinForm.email" />
        </div>
        <div class="form-block">
          <label for="email">Password</label>
          <input type="password" id="password" name="password" v-model="signinForm.password" />
        </div>
        <div class="form-block">
          <p class="error">{{ signinForm.error ? "Error: "+signinForm.error : "" }}</p>
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
    const signinForm = ref({
      email: "",
      password: "",
      error: ""
    });

    return {
      signinForm,
    };
  },

  methods: {
    signin: async function (e: Event) {
      e.preventDefault();
      console.log("signin", this.signinForm)

      try {
        const result = await app.authenticate({
          strategy: "local",
          email: this.signinForm.email,
          password: this.signinForm.password,
        });
        this.signinForm.email = "";
        this.signinForm.password = "";
        app.emit('authenticated', result.user);
        await this.$router.push("/");
      } catch (error: any) {
        this.signinForm.error = error.message;
      }
    },
  },
});
</script>

<style scoped src="@/assets/styles/sign.css">

</style>