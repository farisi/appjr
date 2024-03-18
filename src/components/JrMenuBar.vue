<template>
    <div class="card">
       
    </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref({
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        command: () => {
          router.push('/');
        }
      },
      {
        label: 'About',
        icon: 'pi pi-fw pi-info-circle',
        command: () => {
          router.push('/about');
        }
      }
      );
</script>