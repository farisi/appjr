
import http from '@/services/httpService';
import axios from 'axios';

export const EmployeeService = {
    getData(){
        console.log("url employees get /employes?pagesize=20",)
        return  http.get('/employes?pagesize=20');
    },
    storeData(data){
        const req = http.request({
            method:'post',
            url:'/employes',
            headers:{
                'Content-Type': 'application/json'
            },
            data:data
        })
        return req
    },
    updateData(id,data){
        const req = http.request({
            method:'patch',
            url:'/employes/' + id,
            headers:{'Content-Type': 'application/json'},
            data:data
        })
        return req;
    },
    deleteEmployee(id){
        const req = http.request({
            method:'delete',
            url:'/employes/' + id,
            headers:{'Content-Type': 'application/json'}
        });
        return req;
    }
}