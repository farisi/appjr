
import http from '@/services/httpService';
import axios from 'axios';

export const EmployeeService = {
    getData(){
        return  http.get('/employes');
    },
    storeData(data){
        const req = axios.request({
            method:'post',
            url:'/employes',
            headers:{
                'Content-Type': 'application/json'
            },
            data:data
        })
        return req
    }
}