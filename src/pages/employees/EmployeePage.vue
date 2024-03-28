<template>
    <div class="flex flex-col pt-5">
        <Toast />
        <div class="col-lg-12">
            <div v-if="isLoading()">
                Loading employees...
            </div>
            <div class="card" v-else>
                <h5>Employees List</h5>
                <Toolbar class="mb-4">
                    <template #start>
                        <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                    </template>

                    <template #end>
                        
                    </template>
                </Toolbar>
                <DataTable :value="employeeStore.employees" :paginator="true" 
                    @page="onPage($event)"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5,10,25,50]"  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} employees" :rows="10" ref="dt" dataKey="id"
                   stripedRows removableSort >
                    <Column  header="No" style="min-width: 5rem" >
                    <template #body="{ index,data }">
                        {{ index + 1}}
                    </template>
                    </Column>
                    <Column header="name" style="min-width:10%">
                        <template #body="{data}" >
                            {{  data.firstName + ' ' + data.lastName }}
                        </template>"
                    </Column>
                    <Column field="email" header="Email" sortable style="width: 10%"></Column>
                    <Column field="mobile" header="Mobile" sortable style="width: 10%"></Column>
                    <Column field="address" header="Address" sortable style="width: 25%"></Column>
                    <Column field="birthDate" header="Birthday" sortable style="width: 10%">
                        <template #body="{ data }">
                            {{ formatDate(data.birthDate)}}
                        </template>
                    </Column>
                    <Column field="placeOfBirth" header="Place Of Birth" sortable style="width:10%"></Column>
                    <Column field="joinDate" header="Join Date" sortable style="width: 10%">
                        <template #body="{ data }">
                            {{ formatDate(data.joinDate) }}
                        </template>
                    </Column>
                    <Column header="Action"  style="width: 25%">
                        <template #body="{ data }">
                            <Button icon="pi pi-search" severity="info"  rounded aria-label="Employee Detail" @click="router.push({path:'/users'})"/>
                            <Button icon="pi pi-pencil" severity="warning"  rounded aria-label="Edit Form" @click="editEmployee(data)"/>
                            <Button icon="pi pi-trash" severity="danger" rounded @click="confirmDeleteEmploye(data)" />
                        </template>
                    </Column>
                </DataTable>
                <h4></h4>
            </div>
            <Dialog v-model:visible="employeeDialog" :style="{width: '450px'}" header="Add Employee" :modal="true" class="p-fluid">
               
                        <div class="field">
                            <label for="firstname">Firstname</label>
                            <InputText id="firstname" v-model.trim="employeeStore.employee.firstName" required="true" autofocus :class="{'p-invalid': submitted && !employeeStore.employee.firstName}" />
                            <small class="p-error" v-if="submitted && !employeeStore.employee.firstName">Name is required.</small>
                        </div>
                        <div class="field">
                            <label for="lastname">Lastname</label>
                            <InputText id="lastname" v-model.trim="employeeStore.employee.lastName"  autofocus :class="{'p-invalid': submitted && !employeeStore.employee.lastName}" />
                        </div>
                        <div class="field">
                            <label for="email">Email</label>
                            <InputText id="email" v-model="employeeStore.employee.email" required="true"  :class="{'p-invalid': submitted && !employeeStore.employee.email}"/>
                        </div>
                    <div class="field">
                        <label for="mobile">Mobile</label>
                        <InputText id="mobile" required="true" v-model="employeeStore.employee.mobile"  :class="{'p-invalid': submitted && !employeeStore.employee.mobile}"/>
                    </div>
                    <div class="field">
                        <label for="join_date">Join Date</label>
                        <Calendar v-model="employeeStore.employee.joinDate" inputId="join_date" />
                    </div>
                    <div class="field">
                        <label for="birth_date">Birth day</label>
                        <Calendar v-model="employeeStore.employee.birthDate" inputId="birth_date" />
                    </div>
                    <div class="field">
                        <label for="placeOfBirth">Place Of Birth</label>
                        <InputText id="placeOfBirth" v-model="employeeStore.employee.placeOfBirth" />
                    </div>
                    <div class="field">
                        <label for="salary">Salary</label>
                        <InputNumber v-model="employeeStore.employee.salary" inputId="locale-indonesia" locale="id-ID"/>
                    </div>                    
                    <div class="field">
                        <label for="address">Address</label>
                        <Textarea id="address" rows="4" v-model="employeeStore.employee.address"/>
                    </div>                   
                        <template #footer>
                            <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
                            <Button label="Save" icon="pi pi-check" text @click="saveEmployee" />
                        </template>
            </Dialog>

            <Dialog v-model:visible="deleteEmployesDialog" :style="{width: '550px'}" header="Confirm" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span v-if="employeeStore.employee">Are you sure you want to delete <b>{{employeeStore.employee.email}}</b>?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" text @click="closeDeleteEmployesDialog"/>
                    <Button label="Yes" icon="pi pi-check" text @click="deleteEmployee" />
                </template>
            </Dialog>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Column from 'primevue/column';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import { useToast } from 'primevue/usetoast';
import { useEmployeeStore } from '@/stores/EmployeeStore';
import { useRouter } from "vue-router";


const router = useRouter();



const employeeStore = useEmployeeStore();
const submitted = ref(false);
const employeeDialog = ref(false);
const deleteEmployesDialog = ref(false);
const toast = useToast();

onMounted(() => {
  employeeStore.fetchEmployees();
});

const saveEmployee = () => {
    submitted.value = true;

    if(employeeStore.employee.firstName!='' && employeeStore.employee.email!='' && employeeStore.employee.joinDate!=null && employeeStore.employee.placeOfBirth!='' && employeeStore.employee.birthDate!=null){
        console.log( " save Employee ", employeeStore.employee);
        if(employeeStore.error==null) {
            if(employeeStore.employee.id){
                //const req=EmployeeService.storeData(JSON.stringify(employeeStore.employee))
                employeeStore.updateEmployee()
                toast.add({ severity: 'success', summary: 'Success', detail: 'Your data saved already!', life: 3000 });
            }
            else {
                employeeStore.addEmployee();
                toast.add({ severity: 'success', summary: 'Success', detail: 'Your data saved already!', life: 3000 });
            }
        }
        else {
            employeeDialog.value=false;
            toast.add({ severity: 'info', summary: 'Info', detail: employeeStore.error, life: 3000 });
        }
    }
    else {
        toast.add({ severity: 'info', summary: 'Info', detail: 'Can not pass validation!', life: 3000 });
    }

    employeeDialog.value=false;
};

const editEmployee = (prod) => {
    employeeStore.employee.id=prod.id;
    employeeStore.employee.firstName = prod.firstName
    employeeStore.employee.lastName = prod.lastName
    employeeStore.employee.email=prod.email
    employeeStore.employee.mobile=prod.mobile
    employeeStore.employee.placeOfBirth=prod.placeOfBirth;
    employeeStore.employee.address=prod.address;
    employeeStore.employee.salary=prod.salary;
    employeeStore.employee.birthDate=formatDateForm(prod.birthDate)
    employeeStore.employee.joinDate=formatDateForm(prod.joinDate);
    employeeDialog.value = true;
};

const confirmDeleteEmploye = (prod) => {
    employeeStore.employee = prod;
    deleteEmployesDialog.value = true;
};

const closeDeleteEmployesDialog = () => {
    deleteEmployesDialog.value = false;
    employeeStore.resetForm();
}

const deleteEmployee = () => {
    employeeStore.removeEmployee();  
    deleteEmployesDialog.value = false;
    toast.add({severity:'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000});
};

function showError() {
  if (employeeStore.error) {
    console.error("Error fetching employees:", employeeStore.error);
    // You can display the error message to the user here (e.g., using a toast)
  }
}

function isLoading() {
  return employeeStore.loading;
}

const openNew = () => {
    employeeStore.resetForm();
    submitted.value = false;
    employeeDialog.value = true;
};

const hideDialog = () => {
    employeeDialog.value = false;
    submitted.value = false;
};

const onPage = (event) => {
    console.log(event);
    // lazyParams.value = event;
    // loadLazyData(event);
};
const onSort = (event) => {
    console.log(event);
    lazyParams.value = event;
    loadLazyData(event);
};
const onFilter = (event) => {
    lazyParams.value.filters = filters.value ;
    loadLazyData(event);
};

const formatDateForm=(data)=>{
    let ts = new Date();
    ts.setFullYear(data[0]);
    ts.setMonth(data[1]);
    ts.setDate(data[2])
    return ts;
}

const formatDate=(data)=>{
     let tanggalSekarang = new Date();
     tanggalSekarang.setFullYear(data[0]);
     tanggalSekarang.setMonth(data[1]);
     tanggalSekarang.setDate(data[2])
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