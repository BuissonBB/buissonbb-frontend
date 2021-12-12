<template>
    <div class="section">
        <h2 class="section-title">{{ name }}<img :src="asset(icon)" class="section-icon" /></h2>
        <div class="categories">
            <div class="left-border" :style="`background: ${color};`"></div>
            <router-link v-for="category in categories" :key="category.name" :to="{ name: 'Category', params: { category: category.id } }">
            <a class="category" href="#">
                <div  class="category-icon" :style="`background-image: url(${ asset(category.icon) });`"></div>
                {{ category.name }}
                | {{ topicsCount(category.id) }} {{ topicSingularOrPlural(topicsCount(category.id)) }}
                | {{ totalPostsCount(category.id) }} {{ postSingularOrPlural(totalPostsCount(category.id)) }}
            </a>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">

import { asset } from '@/settings'
import {useTopics} from "@/use/useTopics";

export default {
    methods: {
      asset,

      postSingularOrPlural: (postsNumber) => {
        if (postsNumber > 1) {
          return "posts"
        }
        return "post"
      },

      topicSingularOrPlural: (topicsNumber) => {
        if (topicsNumber > 1) {
          return "topics"
        }
        return "topic"
      }
    },

    props: {
        name: String,
        icon: String,
        color: String,
        categories: Array
    },
    setup(){
      const { topicsCount, totalPostsCount } = useTopics();

      return{
        topicsCount,
        totalPostsCount
      }
    }
};
</script>

<style>
.section {
    margin-bottom: 5em;
}

.section-title {
    font-family: Roboto;
    text-transform: uppercase;
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
