<template>
  <div id="form">
    <div id="form-head">
      <h1 id="head-title">
        Sign Up <img src="@/assets/signup.svg" id="head-icon" />
      </h1>
    </div>
    <div id="form-main">
      <div class="left-border" style="background: #27ae60"></div>
      <form @submit="signup" method="POST">
        <div class="form-block">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" v-model="signupForm.username" required/>
        </div>
        <div class="form-block">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" v-model="signupForm.email" required/>
        </div>
        <div class="form-block">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" v-model="signupForm.password" required/>
        </div>
        <div class="form-block">
          <label for="password2">Password (again)</label>
          <input type="password" id="password2" name="password2" v-model="signupForm.password2" required/>
        </div>
        <div class="form-block">
          <p class="error">{{ signupForm.error ? "Error: "+signupForm.error : "" }}</p>
        </div>
        <div class="centered">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useUsers } from "@/use/userUsers";
import app from '@/feathers-client';

export default defineComponent({
  methods: {
    async signup(e: Event) {
      e.preventDefault();
      const {email, username, password, password2} = this.signupForm;
      if(password !== password2) {
        this.signupForm.error = "Passwords don't match.";
      }
      const { register } = useUsers();
      try {
        await register(username, email, password);

        const result = await app.authenticate({
          strategy: "local",
          email: email,
          password: password,
        });

        this.signupForm.email = "";
        this.signupForm.password = "";

        app.emit('authenticated', result.user);

        await this.$router.push("/");
      }catch(e: any) {
        console.error(e);
        if(e.code === 400) {
          this.signupForm.error = "";
          if(e.message.includes("users_username_unique")) {
            this.signupForm.error += "This username is already taken. ";
          }else if(e.message.includes("users_email_unique")){
            this.signupForm.error += "This email is already taken.";
          }
        }
      }
    },
  },
  setup() {
    const signupForm = ref({
      email: "",
      username: "",
      password: "",
      password2: "",
      error: "",
    });

    return {
      signupForm
    }
  },
});
</script>

<style scoped src="@/assets/styles/sign.css">
</style>