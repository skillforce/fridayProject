import axios from 'axios'


const settings = {
    withCredentials: true,
}
const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    ...settings
})

const instanceHeroky = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
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
export type forgotPassDataType = {
    email: string
    from: string
    message: string
}
export type newPassDataType = {
    password: string
    resetPasswordToken: string
}
export type SetProfileType = {
    name: string
    avatar: string
}

export type ParamsGetCardsType = {
    packName?: string,
    min?: number
    max?: number
    sortPacks?: any
    page?: number
    pageCount?: number
    user_id?: any
}
export type ParamsAddNewCardsType = {
    cardsPack:CardsPackType
}

export type CardsPackType ={
    name?: string,
    deckCover?: string
    privated?:boolean
}


export const authAPI = {
    login(data: RequestDataType) {
        return instance.post('/auth/login', data);
    },
    logOut() {
        return instance.delete('/auth/me');
    },
    signUp(data: SignUpDataRequestType) {
        return instance.post('/auth/register', data);
    },
    authMe() {
        return instance.post('auth/me');
    },
    forgotPass(data: forgotPassDataType) {
        return instanceHeroky.post('/auth/forgot', data);
    },
    setNewPass(data: newPassDataType) {
        return instanceHeroky.post('/auth/set-new-password', data);
    },
}

export const profileAPI = {
    setProfile(data: SetProfileType) {
        return instance.put('/auth/me', data);
    }
}


export const CardsPackAPI = {
    getCards(params: ParamsGetCardsType) {
        const {packName, min, max, sortPacks, page, pageCount, user_id} = params
        return instance.get('/cards/pack', {params: {packName, min, max, sortPacks, page, pageCount, user_id}})
    },
    addNewCards(cardsPack: CardsPackType) {
        return instance.post('/cards/pack',{cardsPack:{...cardsPack}})
    }

}
