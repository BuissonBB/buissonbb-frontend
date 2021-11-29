<template>
    <div class="section">
        <h2 class="section-title">{{ name }}<img :src="asset(icon)" class="section-icon" /></h2>
        <div class="categories">
            <div class="categories-border" :style="`background: ${color};`"></div>
            <a v-for="category in categories" class="category" href="/thread">
            <div  class="category-icon" :style="`background-image: url(${ asset(category.icon) });`"></div>{{ category.name }}</a>
        </div>
    </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import CategoryModel from '@/models/CategoryModel';
import { BACKEND_URL } from '@/settings'
            console.log("backend", BACKEND_URL);

function asset(str) {
    return str+"--";
}

export default {
    methods: {
        asset: (str) => {
            return BACKEND_URL+str;
        },
    },

    props: {
        name: String,
        icon: String,
        color: String,
        categories: CategoryModel
    }
};
</script>

<style scoped>
.section {
    margin-bottom: 5em;
}

.section-title {
    font-family: Roboto;
    text-transform: uppercase;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 33px;
}

.section-icon {
    width: 60px;
    vertical-align: middle;
    margin-left: 1em;
}

.categories {
    background: white;
    position: relative;
    border-radius: 8px;
}

.categories-border {
    position: absolute;
    left: 0px;
    width: 13px;
    top: -10px;
    bottom: -10px;
    border-radius: 10px 0 10px 0;
}

.category {
    display: block;
    padding: 0.7em 2em;
    line-height: 20px;
    border-bottom: 1px solid #eee;
    color: #444;
    font-size: 22px;
    font-weight: 500;
    transition: background-color .33s;
    cursor: pointer;
}

.category:hover {
    background-color: rgba(0, 0, 0, 0.03);
}

.category-title {
    display: inline-block;
    vertical-align: middle;
}

.category-icon {
    vertical-align: middle;
    width: 48px;
    height: 48px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-right: 2em;
    display: inline-block;
}
</style>