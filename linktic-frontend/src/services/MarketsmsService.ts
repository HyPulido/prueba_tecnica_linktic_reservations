import axios from "axios"
import { env } from "../Utils/Environment"
import { UserGetModel, UsersGetModel, UsersPostModel } from "../models/Users"
import { ProductsGetModel, ProductsPostModel } from "../models/Products"
import { ErrorCodesGetModel } from "../models/ErrorCodes"
import { AuthPostModel, LogoutModel } from "../models/Auth"
import { getBaseToken, getToken, userLogout } from "../Utils/Auth"
import { OrdersGetModel, OrdersPostModel } from "../models/Orders"

// const API = env('MARKETSMS_ENDPOINT')
const API ='http://127.0.0.1:8000/api/v1/';
const API_WEB = 'https://domilapp.marketsms.co/api/v1/';

const getHeadersAuth = (content_type?: string) => {
    const headers = {
        'Content-Type': content_type ?? 'application/json',
        'Device-Id': localStorage.getItem('device_id'),
        'Authorization': 'Bearer ' + getToken(),
    }
    return headers;
}


const getHeadersAdminAuth = () => {
    const headers = {
        'Content-Type': 'application/json',
        'Device-Id': localStorage.getItem('device_id'),
        'Authorization': 'Bearer ' + getBaseToken(),
    }
    return headers;
}

export const logout = async (): Promise<LogoutModel> => {
    try {
        const response = await axios.post(API + 'user/logout', {}, { headers: getHeadersAuth() });
        return response.data[0];
    } catch (error: any) {
        // return processErrorResponse(error)
        if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 500)) {
            console.log("Entra a 148");
            return error.response.data[0];
        } else {
            console.log("Entra a 151");
            throw error;
        }
    }
}

export const login = async (body: Object): Promise<AuthPostModel> => {
    try {
        const response = await axios.post(API + 'user/login', body, { headers: getHeadersAuth() });
        return response.data[0];
    } catch (error: any) {
        // return processErrorResponse(error)
        if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 500)) {
            return error.response.data[0];
        } else {
            throw error;
        }
    }
}

export const signUp = async (body: Object) => {
    try {
        const response = await axios.post(API + 'user', body, { headers: getHeadersAuth() });
        return response.data[0];
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            return error.response.data[0];
        } else {
            throw error;
        }
    }
}

// Dashboard
// export const getTraficMessagesByUser = async (range: string): Promise<TrafficGetModel> => {
//     try {
//         var response = await axios.get(API + 'message/trafic/' + range + "/user", { headers: getHeadersAuth() })
//         return response.data[0];

//     } catch (error: any) {
//         return processErrorResponse(error)
//     }
// }

// export const getTraficMessagesByAccount = async (range: string): Promise<TrafficGetModel> => {
//     try {
//         const headers = await getHeadersAuth('multipart/form-data');
//         const account_id = await getCurrentAccountId();
//         var response = await axios.get(API_WEB + 'message/trafic/' + range + "/account?account_id=" + account_id, { headers: headers })
//         return response.data[0];

//     } catch (error: any) {
//         return processErrorResponse(error)
//     }
// }

function processErrorResponse(error: any) {
    if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 500)) {
        if (error.response.status === 401) {
            console.log(error);
            userLogout()
        } else {
            return error.response.data[0];
        }
    } else {
        throw error;
    }
}

export const getCurrentUser = async (): Promise<UserGetModel> => {
    try {
        const response = await axios.get(API + 'user/current', { headers: getHeadersAuth() });
        return response.data[0];
    } catch (error: any) {
        return processErrorResponse(error)
    }
}


export const refreshToken = async () => {
    try {
        const response = await axios.post(API + 'user/token/refresh', {}, { headers: getHeadersAuth() });
        return response.data[0];
    } catch (error: any) {
        return processErrorResponse(error)
    }
}

export const refreshBaseToken = async () => {
    try {
        var headers = getHeadersAuth();
        headers['Authorization'] = getBaseToken()
        const response = await axios.post(API + 'user/token/refresh', {}, { headers: headers });
        return response.data[0];
    } catch (error: any) {
        return processErrorResponse(error)
    }
}

export const sendCode = async (body: Object) => {
    try {
        const response = await axios.post(API + 'code/send', body, { headers: getHeadersAuth() });
        return response.data[0];
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            return error.response.data[0];
        } else {
            throw error;
        }
    }
}

export const verificationCode = async (body: Object) => {
    try {
        const response = await axios.post(API + 'code/verification', body, { headers: getHeadersAuth() });
        return response.data[0];
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            return error.response.data[0];
        } else {
            throw error;
        }
    }
}




// Linktic
export const getProducts = async (): Promise<ProductsGetModel> => {
    try {
        const response = await axios.get(API + 'products', { headers: getHeadersAuth() });
        return response.data[0];
    } catch (error: any) {
        return processErrorResponse(error)
    }
}


export const getOrders = async (): Promise<OrdersGetModel> => {
    try {
        const response = await axios.get(API + 'orders', { headers: getHeadersAuth() });
        return response.data[0];
    } catch (error: any) {
        return processErrorResponse(error)
    }
}


export const createProduct = async (product: Object): Promise<OrdersPostModel> => {
    try {
        const response = await axios.post(API + 'products', product, { headers: getHeadersAuth() });
        return response.data[0];
    } catch (error: any) {
        return processErrorResponse(error)
    }
}

export const updateProduct = async (product: Object, product_id: number): Promise<OrdersPostModel> => {
    try {
        const response = await axios.put(API + 'products/'+product_id, product, { headers: getHeadersAuth() });
        return response.data[0];
    } catch (error: any) {
        return processErrorResponse(error)
    }
}
