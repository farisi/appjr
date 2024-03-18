<template>
    <div class="flex flex-col p-10">
        <div class="card border">
            <DataTable :value="users" :paginator="true" :rows="10" stripedRows>
                <Column  header="No" style="min-width: 8rem" sortable>
                    <template #body="{ index,data }">
                        {{ index + 1}}
                    </template>
                </Column>
                <Column field="name" header="Name" sortable style="min-width: 28rem" ></Column>
                <Column field="username" header="Username" sortable  style="min-width: 28rem"></Column>
                <Column field="email" header="Email" sortable style="min-width: 28rem"></Column>
                
            </DataTable>
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
import TriStateCheckbox from 'primevue/tristatecheckbox';
import VirtualScroller from 'primevue/virtualscroller';
import {UserService} from '@/services/UserService';
import axios from 'axios';

const users = ref();
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/users');
    users.value = response.data;
  } catch (error) {
    console.error('There was an error fetching the users:', error);
  }
});

const rowIndexTemplate = (rowData, column, rowIndex) => {
    console.log(" rowData " + rowData + " column " + column + " rowIndex " + rowIndex)
  return rowIndex + 1;
};
</script>