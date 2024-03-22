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
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      mobile: '',
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
    addEmployee() {
      this.employees.push(this.employeeForm);
      this.resetForm();
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