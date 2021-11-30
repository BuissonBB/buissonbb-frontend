<template>
    <h1>Forum {{ $route.params.forum }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    created () {
        console.log("created", this.$route.params);
    }
});
</script>