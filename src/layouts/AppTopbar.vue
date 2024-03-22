<script setup>
import { useRouter } from  'vue-router'
import { ref } from "vue";
import Avatar from 'primevue/avatar';

const router = useRouter();

const items = ref( [
            {
                label: 'Home',
                icon: 'pi pi-home',
                route: '/'
            },
            {
                label:'Employee',
                items:[
                    {
                        label: 'List Employees',
                        icon:'pi pi-visitor',
                        route:'/employes'
                    },{
                        label:'Add Employee',
                        route:'/employes/create'
                    }
                ]
            },
            {
                label: 'Users',
                icon:'pi pi-visitor',
                route:'/users'
            },
            {
                label: 'Visitor',
                icon:'pi pi-visitor',
                route:'/visitor'
            },
            {
                label: 'Products',
                icon:'pi pi-visitor',
                route:'/products'
            },
            {
                label:'Product2',
                icon:'pi pi-visitor',
                route:'/products2'
            },
            {
                label:'Customers',
                icon:'pi pi-visitor',
                route:'/customers'},
            {
                label: 'About',
                route: '/about'
            }
        ]);
</script>
<template>
    <div class="layout-topbar">
        <Menubar :model="items">
            <template #start>
                <Avatar class="p-overlay-badge" image="/src/assets/images/48x48.png" size="large" />
            </template>
            <template #item="{ item, props, hasSubmenu }">
                <router-link v-if="item.route" v-slot="{ href, navigate,isActive,isExactActive }" :to="item.route" custom>
                    <a :href="href" v-bind="props.action" @click="navigate" :class="{ 'active': isExactActive }">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
                </a>
            </template>
        </Menubar>
    </div>
</template>

<style lang="scss" scoped>
.active {
  color: #ff00ff; /* Ganti dengan warna yang diinginkan */
}

.p-menubar{
    width:100%;
}

.layout-topbar{
    padding: 0 5px;
}
</style>