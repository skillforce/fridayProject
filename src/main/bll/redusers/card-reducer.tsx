import {Dispatch} from 'redux';
import {CardAPI} from '../../dal/Api';
import {AppStoreType} from '../store/store';



const SET_CARD_INFO = 'CardReducer/SET_CARD_INFO';



export const SetCardInfo = (newCardInfo: InitialStateCardType) => ({
    type: 'CardReducer/SET_CARD_INFO' as const,
    newCardInfo
});




let InitialState = {
    cards: [] as OneCardsType[],
    cardsTotalCount: 0,
    maxGrade:0,
    minGrade:5,
    page: 1,
    pageCount: 10,
    packUserId: '' as string
}

export type InitialStateCardType = typeof InitialState

export const CardReducer = (state: InitialStateCardType = InitialState, action: AllTabletActionType): any => {
    switch (action.type) {
        case SET_CARD_INFO :
            return {
                ...state,
                cards: [...action.newCardInfo.cards],
                cardPacksTotalCount: action.newCardInfo.cardsTotalCount
            }

        default:
            return state;
    }
}

export const getCard = (id:string) => {
    return (dispatch: Dispatch, getState: () => AppStoreType) => {
        const state = getState()
        CardAPI.getCards({cardsPack_id:id})
            .then(res => {
                    dispatch(SetCardInfo(res.data))
                }
            )
            .catch(error => {
                console.log(error)
            })
    }

}










//types


export type SetCardInfoType = ReturnType<typeof SetCardInfo>


export type AllTabletActionType =SetCardInfoType





export type OneCardsType ={
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: Date
    updated: Date
    __v: number
    _id: string
}






//
// export type SortPackType = '0cardsCount' | '1cardsCount' | '0name' | '1name' | '0updated' | '1updated'
// export type SearchTextType = 'By name' | 'By creator' | ''
// export type loadingStatusType = 'success' | 'error' | 'loading' | 'redirect'


export default CardReducer;
























