import {Dispatch} from 'redux';
import {CardsPackAPI} from '../../dal/Api';
import {SetIsMessageSend} from './recoverPass-reducer';
import {AppStoreType} from '../store/store';



const SET_TABLET_INFO = 'TabletReducer/SET_TABLET_INFO';


export const SetTabletInfo = (newTabletInfo: InitialStateTabletType) => ({
    type: 'TabletReducer/SET_TABLET_INFO' as const,
    newTabletInfo
});


let InitialState = {
    cardPacks: [
        {
            _id: null as string|null,
            user_id: null as string|null,
            name: null as string|null,
            path: null as string|null,
            cardsCount: null as number|null,
            grade: null as number|null,
            shots: null as number|null,
            rating: null as number|null,
            type: null as string|null,
            created: null as Date|null,
            updated: null as Date|null,
            __v: null as number|null,
            user_name:null as string|null
        } as cardType,
    ],
    cardPacksTotalCount:  null as number|null,
    maxCardsCount:  40,
    minCardsCount:  1,
    page: 1 ,
    pageCount: 10 ,
}

export type InitialStateTabletType = typeof InitialState

export const TabletReducer = (state: InitialStateTabletType = InitialState, action: AllTabletActionType): any => {
    switch (action.type) {
        case SET_TABLET_INFO :
            return {...state, cardPacks:[...action.newTabletInfo.cardPacks]}
        default:
            return state;
    }
}

export const getCarsPack = () => {
    return (dispatch: Dispatch, getState:()=>AppStoreType) => {
        const state = getState()
        const page =state.tablet.page
        const pageCount = state.tablet.pageCount
        const minCardsCount = state.tablet.minCardsCount
        const maxCardsCount = state.tablet.maxCardsCount
        CardsPackAPI.getCards({page:page,pageCount:pageCount,min:minCardsCount,max:maxCardsCount,})
            .then(res => {
                   dispatch(SetTabletInfo(res.data))
                console.log(res.data)
                }
            )
            .catch(error => {
                    console.log(error)
                }
            )
    }

}


//types


export type SetTabletInfoType = ReturnType<typeof SetTabletInfo>

export type AllTabletActionType = SetTabletInfoType;

export type cardType ={
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: string
    created: Date
    updated: Date
    __v: number
    user_name:string}


export default TabletReducer;
























