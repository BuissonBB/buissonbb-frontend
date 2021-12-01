<template>
    <div class="message">
        <div class="user-meta">
            <div class="user-color" :style="`background: ${user.color};`"></div>
            <div class="user-profile-picture" :style="`background: ${user.picture};`">

            </div>
            <div class="user-info">
                <p class="user-name">{{ user.name }}</p>
                <p class="user-rank">{{ user.rank }}</p>
            </div>
        </div>
        <div class="message-main">
            <div class="message-meta">
                <span class="message-publish-date">{{ message.publishDate }}</span>
                <span class="message-edit-date">{{ message.editDate }}</span>
                <img class="message-settings" src="@/assets/settings.svg" />
            </div>
            <div class="message-content">
                {{ message.content }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MessageModel from '@/models/MessageModel';
import UserModel from '@/models/UserModel';

export default defineComponent({
    props: {
        message: MessageModel,
        user: UserModel
    }
});
</script>

<style scoped>
.message {
    background: white;
    border-radius: 8px;
    position: relative;
    display: flex;
    overflow: hidden;
    font-family: 'Maven Pro', Arial, Helvetica, sans-serif;
}

.user-color {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 46px;
    border-bottom-right-radius: 8px;
}

.user-profile-picture {
    position: relative;
    width: 71px;
    height: 71px;
    display: inline-block;
    outline: 5px solid #FFFFFF;
    border-radius: 6px;
}

.user-name, .user-rank {
    position: relative;
    margin: 0;
}

.user-meta {
    min-width: 132px;
    position: relative;
    text-align: center;
    padding-top: 23px;
}

.user-info {
    margin-top: 15px;
}

.user-name {
    font-family: 'Fugaz One', Arial, Helvetica, sans-serif;
    text-transform: uppercase;
}

.user-rank {
    padding-top: 5px;
}

.message {
    margin-bottom: 1.5em;
}

.message-main {
    padding: 0px 20px 20px 0px;
}

.message-meta {
    height: 46px;
    padding-left: 1em;
    font-size: 12px;
    font-weight: 500;
    color: #666;
    height: 48px;
    line-height: 48px;
    position: relative;
}

.message-settings {
    position: absolute;
    top: 13px;
    right: 0px;
    cursor: pointer;
}

.message-content p {
    margin-top: 5px;
}

.message-meta > p {
    margin: 0;
}
</style>