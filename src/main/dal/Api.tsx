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
    cardsPack: CardsPackType
}

export type CardsPackType = {
    name?: string,
    deckCover?: string
    privated?: boolean
}
export type CardParamType = {
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: any
    page?: number
    pageCount?: number
}
export type newCardDataType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}

export type newUpdateCardDataType = {
    _id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
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
        const {min, max, sortPacks, page, pageCount, user_id} = params
        return instance.get('/cards/pack', {params: {min, max, sortPacks, page, pageCount, user_id}})
    },
    addNewCards(cardsPack: CardsPackType) {
        return instance.post('/cards/pack', {cardsPack: {...cardsPack}})
    },
    deleteCards(cardId: string) {
        return instance.delete('/cards/pack', {params: {id: cardId}})
    },
    updateCards(cardId: string) {
        return instance.put('/cards/pack', {cardsPack: {_id: cardId, name: 'new_cards_name'}})
    }

}

export const CardAPI = {
    getCards(params: CardParamType) {
        const {min, max, sortCards, page, pageCount, cardsPack_id} = params
        return instance.get('/cards/card', {params: {sortCards, min, max, cardsPack_id, page, pageCount}})
    },
    addNewCards(newCardParams: newCardDataType) {
        return instance.post('/cards/card', {card: {...newCardParams}})
    },
    deleteCard(cardId: string) {
        return instance.delete('/cards/card', {params: {id: cardId}})
    },
    updateCard(newCardParams: newUpdateCardDataType) {
        return instance.put('/cards/card', {card: {...newCardParams}})
    }

}
