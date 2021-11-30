<template>
    <header id="appbar">
        <router-link :to="{ name: 'Home'}">
            <a href="#" id="title-link"><h1 id="title">{{ title }}</h1></a>
        </router-link>
        <div id="login-buttons">
            <a href="#">Sign in</a>
            <a href="#">Sign up</a>
        </div>
    </header>
</template>

<script lang="ts">
import { useForumConfig } from '@/use/useForumConfig';
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
    setup() {
        const { title } = useForumConfig();
        return {
            title
        };
    }
});
</script>

<style scoped>
#appbar {
    background: linear-gradient(90deg, #27AE60 18.78%, #27AE60 89.56%);
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

#login-buttons {
    position: absolute;
    right: 0px;
    top: 0px;
    line-height: 28px;
    background: url('~@/assets/appbar-right.svg');
    padding-left: 3em;
    background-size: cover;
    font-size: 18px;
}

#login-buttons > a {
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

#login-buttons > a::after {
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

#login-buttons > a:hover::after {
    left: 40%;
    right: 40%;
}
</style>