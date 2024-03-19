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
    error:null
  }),
  getters:{
    totalEmployees: (state) => state.employees.length,
  },
  actions: {
    async fetchEmployees(){
        this.employees=[];
        this.loading=true;
        try {
            this.employees = await EmployeeService.getData()
            .then((response)=>this.employees=response.data)
        } catch (error) {
            this.error = error;
        }
        finally {
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
  }
});