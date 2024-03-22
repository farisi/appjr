import { createApp } from 'vue'
import   './style.css'
import 'primevue/resources/themes/aura-light-blue/theme.css'
import 'primeicons/primeicons.css'
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Panel from "primevue/panel";
import Menubar from 'primevue/menubar';
import TabMenu from 'primevue/tabmenu';
import DataTable from 'primevue/datatable';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import router from './routers';
import {createPinia} from "pinia"
import '@/assets/styles.scss';


createApp(App)
.component('Panel', Panel)
.component('Menubar', Menubar)
.component('TabMenu', TabMenu)
.component('DataTable', DataTable)
.use(PrimeVue, { ripple: true })
.use(router)
.use(ToastService )
.use(createPinia())
.component('Toast', Toast)
.mount('#app')
