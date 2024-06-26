// 1. Define route components.
// These can be imported from other files
import {createRouter,createWebHistory} from 'vue-router'; 
import Home from '@/pages/Home.vue'; 
import About from '@/pages/About.vue';
import Visitor from '@/pages/Visitor.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import Product from '@/pages/Product.vue';
import UserPage from '@/pages/UserPage.vue';
import EmployeePage from '@/pages/employees/EmployeePage.vue';
import EmployeeDetailPage from '@/pages/Employees/EmployeeDetailPage.vue';
import CustomerPage from '@/pages/CustomerPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import Customer from '@/pages/Customer.vue';
import Messager from '@/pages/Messager.vue';

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [{
    path:'/',
    component: AppLayout,
    children:[
        { path: '/', component: Home },
        { path: '/about', component: About },
        {path: '/visitor', component: Visitor},
        {path:'/products', component:Product},
        {path:'/products2', component: ProductPage},
        {path:'/customers', component: CustomerPage},
        {path:'/customers2', component: Customer},
        { path: '/users', component: UserPage },
        { path: '/employes', component: EmployeePage },
        {path:'/employes/:id', component: EmployeeDetailPage},
        {path:'/messager', component: Messager}
    ]
}
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We
  // are using the hash history for simplicity here.
  history: createWebHistory(),
  routes:routes, // short for `routes: routes`
})

export default router;