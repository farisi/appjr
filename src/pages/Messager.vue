<template>
    <div id="app">
        <h1>Vue.js Socket.io Chat</h1>
        <div class="field col-12 md:col-6">
            <InputText id="email" v-model="message" required="true" />
            <Button label="Save" icon="pi pi-check"  @click="sendMessage" />
        </div>

        <ul>
            <li v-for="msg in messages" :key="msg">{{ msg }}</li>
        </ul>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref, onMounted,reactive } from 'vue';
import {socket} from '@/socket';

const message = ref('');
const messages = ref([]);

socket.on('connect', () => {
    console.log("Connected to Server");
});

socket.on("message", (data) => {
    console.log("Received message:", data);
    messages.value.push(data);
});

function sendMessage() {
    console.log('Tombol ditekan:', message.value);
    socket.emit('message', { text: message.value });
    message.value ="";
}
</script>