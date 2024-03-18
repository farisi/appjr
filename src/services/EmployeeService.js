
import http from '@/services/httpService';
import axios from 'axios';

export const EmployeeService = {
    getData(){
        return  http.get('/employes');
    },
    storeData(data){
        const req = axios.request({
            method:'post',
            url:'http://localhost:8080/api/employes',
            headers:{
                'Content-Type': 'application/json'
            },
            data:data
        })
        return req
    }
}