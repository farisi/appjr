<template>
    <div class="flex flex-col pt-5">
        <div class="col-lg-12">
            <div v-if="isLoading()">
                Loading employees...
            </div>
            <div v-else-if="employeeStore.error">
                <p>Error fetching employees: {{ error.message }}</p>
            </div>
            <div class="card" v-else>
                <h5>Employyes List</h5>
                <DataTable :value="employeeStore.employees" lazy paginator  :rows="10" ref="dt" dataKey="id"
                    :totalRecords="totalRecords" stripedRows removableSort @page="onPage($event)" @sort="onSort($event)">
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
                            {{ formatDateTime(data.joinDate) }}
                        </template>
                    </Column>
                    <Column header="Action"  style="width: 15%">
                        <template #body="{ data }">
                            <Button icon="pi pi-file-edit" severity="warning" aria-label="Submit" />
                            <Button icon="pi pi-trash" severity="danger" />
                        </template>
                    </Column>
                </DataTable>
                <h4></h4>
            </div>
    </div>
</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
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
import { useEmployeeStore } from '@/stores/EmployeeStore';


const employeeStore = useEmployeeStore();
const totalRecords = useEmployeeStore.totalEmployees;

const dt = ref();
const lazyParams = ref({});
const first = ref(0);

onMounted(() => {
  employeeStore.fetchEmployees();
});

function showError() {
  if (employeeStore.error) {
    console.error("Error fetching employees:", employeeStore.error);
    // You can display the error message to the user here (e.g., using a toast)
  }
}

function isLoading() {
  return employeeStore.loading;
}

const onPage = (event) => {
    lazyParams.value = event;
};
const onSort = (event) => {
    console.log(event);
    lazyParams.value = event;
};
const onFilter = (event) => {
    lazyParams.value.filters = filters.value ;
};

const formatDate=(data)=>{
    let tanggalSekarang = new Date(data);
    let formatIndonesia=new Intl.DateTimeFormat('id-ID',{
        year: 'numeric',    month: 'short',    day: '2-digit'
    }).format(tanggalSekarang)
    //tanggalSekarang.toLocaleDateString('id-ID');
    return formatIndonesia
}

const formatDateTime=(data)=>{
    let ts = new Date();
    ts.setFullYear(data[0]);
    ts.setMonth(data[1]);
    ts.setDate(data[2])
    ts.setHours(data[3])
    ts.setMinutes(data[4])
    let formatIndonesia=new Intl.DateTimeFormat('id-ID',{
        year: 'numeric',    month: 'short',    day: '2-digit',hour: 'numeric',
  minute: 'numeric'
    }).format(ts)
    //tanggalSekarang.toLocaleDateString('id-ID');
    return formatIndonesia
}
</script>