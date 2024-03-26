<template>
<div class="flex flex-col p-10">
    <Toast />
    <div class="col-12">
            <div class="card">
                <h5>Employee Form</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                        <label for="firstName">Firstname</label>
                        <InputText id="firstName"  v-model="employeeStore.employee.firstName"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastName">Lastname</label>
                        <InputText id="lastName"  v-model="employeeStore.employee.lastName" />
                        
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="email">Email</label>
                        <InputText id="email" v-model="employeeStore.employee.email" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="mobile">Mobile</label>
                        <InputText id="mobile" v-model="employeeStore.employee.mobile" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="join_date">Join Date</label>
                        <Calendar v-model="employeeStore.employee.joinDate" inputId="join_date" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="birth_date">Birth day</label>
                        <Calendar v-model="employeeStore.employee.birthDate" inputId="birth_date" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="placeOfBirth">Place Of Birth</label>
                        <InputText id="placeOfBirth" v-model="employeeStore.employee.placeOfBirth" />
                    </div>
                    
                    <div class="field col-12">
                        <label for="address">Address</label>
                        <Textarea id="address" rows="4" v-model="employeeStore.employee.address"/>
                    </div>                    
                </div>
                <Button label="Submit"  @click="employeeStoring"/>
                <router-link to="/"  rel="noopener">
                    <Button label="Cancel"  severity="secondary"/>
                </router-link>
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
import {EmployeeService} from '@/services/EmployeeService';
import { useToast } from 'primevue/usetoast';
import { useEmployeeStore } from '@/stores/EmployeeStore';


const employeeStore = useEmployeeStore();
const toast = useToast();

const employeeStoring = ()=>{

    if(employeeStore.employee.firstName!='' && employeeStore.employee.email!='' && employeeStore.employee.joinDate!=null && employeeStore.employee.placeOfBirth!='' && employeeStore.employee.birthDate!=null){
        console.log(" employee ", JSON.stringify(employeeStore.employee));
        const req = EmployeeService.storeData(JSON.stringify(employeeStore.employee))
        employeeStore.resetForm();
        req.then((response)=>{
            toast.add({ severity: 'success', summary: 'Success', detail: 'Your data saved already!', life: 3000 });
        })

    }
    else {
        toast.add({ severity: 'info', summary: 'Info', detail: 'Can not pass validation!', life: 3000 });
    }
}

</script>
<style>
.p-button{
    margin-left: 10px;
    margin-right: 10px;
}
</style>