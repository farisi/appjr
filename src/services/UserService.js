import axios from 'axios';

export const UserService = {
    getData(){
        const check = axios({ method: "GET", "url": "http://localhost:8080/api/users" });
        return check;
    }
}