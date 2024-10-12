import axios from "axios"
import { env } from "../Utils/Environment"
import { UserGetModel, UsersGetModel, UsersPostModel } from "../models/Users"
import { ReservationsGetModel, ReservationsPostModel } from "../models/Reservations"
import { ErrorCodesGetModel } from "../models/ErrorCodes"
import { AuthPostModel, LogoutModel } from "../models/Auth"
import { getBaseToken, getToken, userLogout } from "../Utils/Auth"
// import { OrdersGetModel, OrdersPostModel } from "../models/Orders"

const API = env('LINKTIC_ENDPOINT')

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
export const getReservations = async (): Promise<ReservationsGetModel> => {
    try {
        const response = await axios.get(API + 'reservations', { headers: getHeadersAuth() });
        return response.data[0];
    } catch (error: any) {
        return processErrorResponse(error)
    }
}


export const createReservation = async (product: Object): Promise<ReservationsPostModel> => {
    try {
        const response = await axios.post(API + 'reservation', product, { headers: getHeadersAuth() });
        return response.data[0];
    } catch (error: any) {
        return processErrorResponse(error)
    }
}

export const updateReservation = async (product: Object, product_id: number): Promise<ReservationsPostModel> => {
    try {
        const response = await axios.put(API + 'reservation/' + product_id, product, { headers: getHeadersAuth() });
        return response.data[0];
    } catch (error: any) {
        return processErrorResponse(error)
    }
}
