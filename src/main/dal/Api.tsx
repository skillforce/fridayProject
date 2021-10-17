import axios from 'axios'


const settings = {
    withCredentials: true,
}
const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    ...settings
})

// api

export type RequestDataType = {
    email: string
    password: string
    rememberMe: boolean
}
export type SignUpDataRequestType = {
    email: string
    password: string
}


export const authAPI = {
    login(data: RequestDataType) {
        return instance.post('auth/login', data);
    },
    logOut() {
        return instance.delete('auth/me');
    },
    signUp(data: SignUpDataRequestType) {
        return instance.post('auth/register', data);
    }
}


