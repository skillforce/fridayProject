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

export const authAPI = {
    login(data: RequestDataType) {
        return instance.post('auth/login', data);
    },
    // logout() {
    //     const promise = instance.delete('auth/login');
    //     return promise;
    // },
    // me() {
    //     const promise =  instance.get('auth/me');
    //     return promise
    // }
}

// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
