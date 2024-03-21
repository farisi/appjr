<template>

    <div class="flex flex-col p-10" >
        <div class="card border">
            <DataTable :value="products" removableSort  stripedRows >
                <Column field="code" header="Code" sortable style="width: 25%"></Column>
                <Column field="name" header="Name" sortable style="min-width: 28rem"></Column>
                <Column field="category" header="Category" sortable style="min-width: 28rem"></Column>
                <Column field="quantity" header="Quantity" sortable style="min-width: 28rem"></Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ProductService } from '@/services/ProductService';
import Column from 'primevue/column';

onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data));
});

const products = ref();

</script>