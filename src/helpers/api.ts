import axios from 'axios';

let  headers: any = {};
const userToken = localStorage.getItem('userToken');

if (userToken) {
    headers["Authorization"] = `Bearer ${userToken}`;
}

export const Api = {
    apiAuth: axios.create({
        baseURL: process.env.REACT_APP_AUTH_URL,
        headers
    })
};