<template>
    <div id="app">
        <h1>Vue.js Socket.io Chat</h1>
        <InputText id="email" v-model="message" required="true" />
        <Button label="Save" icon="pi pi-check" text @click="sendMessage" />
        <ul>
            <li v-for="msg in messages" :key="msg">{{ msg }}</li>
        </ul>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref, onMounted } from 'vue';

const message = ref();
const messages = ref([])

const sendMessage = ()=>{

}
</script>