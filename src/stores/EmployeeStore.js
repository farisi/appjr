import { defineStore } from 'pinia';
import { computed, ref } from "vue";
import {EmployeeService} from '@/services/EmployeeService';

export const useEmployeeStore = defineStore('employees', {
  state: () => ({
    employees: [],
    pageable:{
      pageNumber: 0,
      pageSize: 10,
      sort: {
            empty: false,
            sorted: true,
            unsorted: false
        },
        offset: 0,
        paged: true,
        unpaged: false
    },
    employee: {
      id:0,
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      mobile: '',
      salary:0.0,
      jobExperiences:[],
      birthDate: null,
      placeOfBirth: '',
      joinDate: null
    },
    last:false,
    totalElements:0,
    totalPages: 1,
    size:0,
    number:0,
    sort:{
      empty: false,
      sorted:true,
      unsorted:false
    },
    totalRecord:0,
    first:true,
    empty:true,
    loading:false,
    error:null,
  }),
  getters:{
    totalEmployees: (state) => state.employees.length,
    updatedEmployees: (state) => {
      states.employees.filter((item)=>{
        if(item.id==employee.id){
          item=employee
        }
      })
    }
  },
  actions: {
    async fetchEmployees() { // Use arrow function
      this.loading=true;
      this.error=null;
      try {
        
        const response = await EmployeeService.getData();
        this.employees = response.data.content;
        this.totalRecord=response.data.numberOfElements;
        this.pageable=response.data.pageable;
        this.sort=response.data.sort;
        this.number=response.data.number;
        this.first=response.data.first;
        this.empty=response.data.empty;
        this.totalPages=response.data.totalPages;

      } catch (error) {
        this.error=error;
      } finally {
        this.loading=false;
      }
    },
    async addEmployee() {
      this.error=null;
      try {
        const response = await EmployeeService.storeData(JSON.stringify(this.employee))
        this.employees.splice(0,0,this.employee);
        this.resetForm();
      }
      catch(error) {
        this.error=error;
      }
      finally {
        this.loading=false;
      }
    },
    async updateEmployee(){
      this.error=null;
      try {
        console.log(this.employee)
        const response = await EmployeeService.updateData(this.employee.id,JSON.stringify(this.employee))
        const index = this.employees.findIndex(e=>e.id===this.employee.id);
        if(index !== -1){
          this.employees[index] = this.employee;
        }
      }
      catch(error) {
        this.error=error;
      }
      finally {
        this.loading=false;
      }
     
    },
    async removeEmployee(){
      this.error=null;
      console.log("will delete employee with id ", this.employee.id);
      try {
        const response = await  EmployeeService.deleteEmployee(this.employee.id)
        const index = this.employees.findIndex(e=>e.id===this.employee.id);
        console.log(" index ", index);
        if(index !== -1){
          this.employees.splice(index,1);
        }
      }
      catch(error) {
        console.log('terjadi error ', error);
        this.error=error;
      }
      finally {
        this.loading=false;
        this.resetForm();
      }
    },
    resetForm() {
      this.employee = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        mobile: '',
        birthDate: null,
        placeOfBirth: '',
        joinDate: null
      };
    },
    // Tambahkan metode update dan delete sesuai kebutuhan
  },
  mutations: {
    
  }
});