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
    }),
    apiProducts: axios.create({
        baseURL: process.env.REACT_APP_PRODUCTS_URL,
        headers
    }),
    apiOrders: axios.create({
        baseURL: process.env.REACT_APP_ORDERS_URL,
        headers
    }),
    apiManager: axios.create({
        baseURL: process.env.REACT_APP_MANAGER_URL,
        headers
    })
};

export const apiSetTokenDefault = (token: string) => {
    // repetir isso para todas as apis
    Api.apiAuth.defaults.headers['Authorization'] = `Bearer ${token}`;
    Api.apiProducts.defaults.headers['Authorization'] = `Bearer ${token}`;
    Api.apiOrders.defaults.headers['Authorization'] = `Bearer ${token}`;
    Api.apiManager.defaults.headers['Authorization'] = `Bearer ${token}`;
}