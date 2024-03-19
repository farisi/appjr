<template>
    <div v-if="loading">
        Loading employees...
    </div>
    <div v-else class="flex flex-col pt-5">
        <div class="col-lg-12">
        <div class="card">
            <h5>Employyes List</h5>

            <DataTable v-model:editingRows="editingRows" :value="employees" :paginator="true" :rows="10" stripedRows removableSort editMode="row" dataKey="id" >
                <Column  header="No" style="min-width: 5rem" >
                <template #body="{ index,data }">
                    {{ index + 1}}
                </template>
                </Column>
                <Column field="firstName" header="First Name" sortable  style="min-width:10%" >
                    <template #body="{ data, field }">
                        {{data[field]}}
                    </template>
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]"  />
                    </template>
                </Column>
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
                <!--
                <Column header="Action"  style="width: 15%">
                    <template #body="{ data }">
                        <Button icon="pi pi-file-edit" severity="warning" aria-label="Submit" />
                        <Button icon="pi pi-trash" severity="danger" />
                    </template>
                </Column>-->
                <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
            </DataTable>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import InputIcon from 'primevue/inputicon';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { storeToRefs } from 'pinia'
import InputText from 'primevue/inputtext';
import { useEmployeeStore } from '@/stores/EmployeeStore';

const { employees, loading, error } = storeToRefs(useEmployeeStore())
const {fetchEmployees} = useEmployeeStore()
const editingRows = ref([]);
fetchEmployees();

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