<template>
    <div class="flex flex-col pt-5">
        <div class="col-lg-12">
        <div class="card">
            <h5>Employyes List</h5>
            <DataTable :value="employees" :paginator="true" :rows="10" stripedRows removableSort>
                <Column  header="No" style="min-width: 5rem" >
                <template #body="{ index,data }">
                    {{ index + 1}}
                </template>
                </Column>
                <Column field="firstName" header="First Name" sortable  style="min-width:10%" ></Column>
                <Column field="lastName" header="Last Name" sortable style="min-width:10%" ></Column>
                <Column field="email" header="Email" sortable style="width: 10%"></Column>
                <Column field="mobile" header="Mobile" sortable style="width: 10%"></Column>
                <Column field="address" header="Address" sortable style="width: 25%"></Column>
                <Column field="birthDate" header="Birthday" sortable style="width: 10%">
                    <template #body="{ data }">
                        {{ formatDate(data.birthDate)}}
                    </template>
                </Column>
                <Column field="placeOfBirth" header="Place Of Birth" sortable style="width:10%"></Column>
                <Column field="joinDate" header="Join Date" sortable style="width: 20%">
                    <template #body="{ data }">
                        {{ formatDateTime(data.joinDate)}}
                    </template>
                </Column>
                <Column header="Action"  style="width: 15%">
                    <template #body="{ data }">
                        <Button icon="pi pi-file-edit" severity="warning" aria-label="Submit" />
                        <Button icon="pi pi-trash" severity="danger" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import Column from 'primevue/column';
import MultiSelect from 'primevue/multiselect';
import Tag from 'primevue/tag';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import VirtualScroller from 'primevue/virtualscroller';
import {EmployeeService} from '@/services/EmployeeService';
import axios from 'axios';

const employees = ref();
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/employes');
    employees.value = response.data;
  } catch (error) {
    console.error('There was an error fetching the users:', error);
  }
});

const formatDate=(data)=>{
    let tanggalSekarang = new Date(data);
    let formatIndonesia=new Intl.DateTimeFormat('id-ID',{
        year: 'numeric',    month: 'short',    day: '2-digit'
    }).format(tanggalSekarang)
    //tanggalSekarang.toLocaleDateString('id-ID');
    return formatIndonesia
}

const formatDateTime=(data)=>{
    let tanggalSekarang = new Date(data);
    let formatIndonesia=new Intl.DateTimeFormat('id-ID',{
        year: 'numeric',    month: 'short',    day: '2-digit',hour: 'numeric',
  minute: 'numeric',
    }).format(tanggalSekarang)
    //tanggalSekarang.toLocaleDateString('id-ID');
    return formatIndonesia
}
</script>