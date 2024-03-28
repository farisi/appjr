<template>
    <div class="flex flex-col p-10">
        <Toast />
        <div class="col-12">
            <div class="card">
                <h5>Employee Detail</h5>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import { EmployeeService } from '@/services/EmployeeService';
import { useToast } from 'primevue/usetoast';
import { useEmployeeStore } from '@/stores/EmployeeStore';


const employeeStore = useEmployeeStore();
const toast = useToast();

const employeeStoring = () => {

    if (employeeStore.employee.firstName != '' && employeeStore.employee.email != '' && employeeStore.employee.joinDate != null && employeeStore.employee.placeOfBirth != '' && employeeStore.employee.birthDate != null) {
        console.log(" employee ", JSON.stringify(employeeStore.employee));
        const req = EmployeeService.storeData(JSON.stringify(employeeStore.employee))
        employeeStore.resetForm();
        req.then((response) => {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Your data saved already!', life: 3000 });
        })

    }
    else {
        toast.add({ severity: 'info', summary: 'Info', detail: 'Can not pass validation!', life: 3000 });
    }
}

</script>
<style>
.p-button {
    margin-left: 10px;
    margin-right: 10px;
}
</style>