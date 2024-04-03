<template>
    <div class="flex flex-col p-10">
        <Toast />
        <div class="col-12">
            <div class="card">
                <h5>Employee Detail</h5>
                {{ employeeStore.employee }}
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref,watch,onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router"
import { useToast } from 'primevue/usetoast';
import { useEmployeeStore } from '@/stores/EmployeeStore';
import {storeToRefs} from 'pinia';


const employeeStore = useEmployeeStore();
const toast = useToast();
const route = useRoute();
const router = useRouter();

onMounted(()=>{

    employeeStore.employee = employeeStore.employees.find((emp)=>{
        return (emp.id == route.params.id)
    })

    console.log( " employeeStore.employee " + employeeStore.employee);

    if(employeeStore.employee === "undefined"){
        console.log( " pindah ke halaman lain! ")
        router.push({path:'/'})
    }
    else {
        console.log( " tetap dihalaman ini! ")
    }
})

</script>
<style>
.p-button {
    margin-left: 10px;
    margin-right: 10px;
}
</style>