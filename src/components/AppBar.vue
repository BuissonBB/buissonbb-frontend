<template>
    <header id="appbar" :style="`background: linear-gradient(90deg, ${colors[0]} 18.78%, ${colors[1]} 89.56%);`">
        <router-link :to="{ name: 'Home'}">
            <a href="#" id="title-link"><h1 id="title">{{ title }}</h1></a>
        </router-link>
        <div id="auth-buttons" v-if="!currentUser">
            <router-link :to="{ name: 'SignIn'}">
                <a href="#" class="auth-button">Sign in</a>
            </router-link>
            <router-link :to="{ name: 'SignUp'}">
                <a href="#" class="auth-button">Sign up</a>
            </router-link>
        </div>
        <div id="auth-buttons" v-if="currentUser">
            <a href="#" class="auth-button">Profile: {{ currentUser.username }}</a>
            <a href="#" class="auth-button" @click="signout"><img src="@/assets/signout.svg" id="signout-icon" /></a>
        </div>
    </header>
</template>

<script lang="ts">
import { useForumConfig } from '@/use/useForumConfig';
import { defineComponent, ref } from "vue";
import app from '@/feathers-client';

export default defineComponent({
    methods: {
        signout() {
            console.log("signout")
            localStorage.removeItem('access-token');
            app.emit('authenticated', null);
        }
    },
    setup() {
        const { title, colors } = useForumConfig();
        const currentUser = ref(null);

        app.addListener('authenticated', (user) => {
            currentUser.value = user;
        });

        return {
            title,
            colors,
            currentUser
        };
    }
});
</script>

<style scoped>
#appbar {
    display: block;
    position: relative;
    height: 66px;
    font-family: 'Comfortaa';
    color: white;
    font-weight: bold;

    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
}

#title-link {
    color: white;
}

#title {
    margin: 0;
    font-size: 24px;
    line-height: 27px;
    /* Centrer le texte verticallement : */
    height: 66px;
    line-height: 66px;
    padding: 0 4em 0 2em;
    background: url('~@/assets/appbar-left.svg');
    display: inline-block;
    background-size: cover;
    background-position: 100%;
}

#auth-buttons {
    position: absolute;
    right: 0px;
    top: 0px;
    line-height: 28px;
    background: url('~@/assets/appbar-right.svg');
    padding-left: 3em;
    background-size: cover;
    font-size: 18px;
}

.auth-button {
    /* Centrer le texte verticallement : */
    height: 66px;
    line-height: 66px;
    padding: 0px 2em;
    cursor: pointer;
    display: inline-block;
    transition: background-color .33s;
    position: relative;
    color: white;
}

.auth-button::after {
    content: "";
    height: 3px;
    background-color: white;
    position: absolute;
    left: 50%;
    right: 50%;
    top: 72%;
    transition: left .33s, right .33s;
    border-radius: 5px;
}

.auth-button:hover::after {
    left: 40%;
    right: 40%;
}
#signout-icon {
    vertical-align: middle;
    width: 30px;
    position: relative;
    bottom: 2px;
}
</style>