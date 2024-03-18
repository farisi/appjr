import { defineStore } from 'pinia';
import {EmployeeService} from '@/services/EmployeeService';

export const useEmployeeStore = defineStore('employee', {
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
    }
  }),
  actions: {
    fetchEmployees: () =>{
        return EmployeeService.getData().then(res=> this.employees=res.data)
        .catch(error=>{
            console.error(error);
        });
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