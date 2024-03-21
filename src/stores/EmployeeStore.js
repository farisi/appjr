import { defineStore } from 'pinia';
import { computed, ref } from "vue";
import {EmployeeService} from '@/services/EmployeeService';

export const useEmployeeStore = defineStore('employees', {
  state: () => ({
    employees: [],
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
    loading:false,
    error:null,
  }),
  getters:{
    totalEmployees: (state) => state.employees.length,
    listEmployees: (state) => state.employees
  },
  actions: {
    async fetchEmployees() { // Use arrow function
      this.loading=true;
      this.error=null;
      try {
        const response = await EmployeeService.getData();
        this.employees = response.data;
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