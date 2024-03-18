<script setup>
import Card from 'primevue/card';

</script> 
<template>
    <section class="flex flex-col p-10">
        <div class="basis-1/4">
            <Panel header="Custom Header" :pt="{
            header: 'p-5 flex items-center justify-between border border-indigo-300 bg-indigo-500 text-indigo-50 rounded-tl-lg rounded-tr-lg dark:bg-indigo-900 dark:border-indigo-900/40 dark:text-white/80'
        }">
            <p>
                About Page
            </p>
        </Panel></div>
        
    </section>
</template>