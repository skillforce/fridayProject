import {Dispatch} from 'redux';
import {CardsPackAPI} from '../../dal/Api';
import {SetIsMessageSend} from './recoverPass-reducer';
import {AppStoreType} from '../store/store';



const SET_TABLET_INFO = 'TabletReducer/SET_TABLET_INFO';
const SET_CURRENT_PAGE = 'TabletReducer/SET_CURRENT_PAGE';
const SET_MIN_MAX_CARDS_COUNT = 'TabletReducer/SET_MIN_MAX_CARDS_COUNT';
const SET_SORT_STATUS = 'TabletReducer/SET_SORT_STATUS';


export const SetTabletInfo = (newTabletInfo: InitialStateTabletType) => ({
    type: 'TabletReducer/SET_TABLET_INFO' as const,
    newTabletInfo
});

export const SetCurrentPage = (newPage:number) => ({
    type: 'TabletReducer/SET_CURRENT_PAGE' as const,
    newPage
});

export const SetMinMaxCardsCurrent = (newMinMaxCurrent:number[]) => ({
    type: 'TabletReducer/SET_MIN_MAX_CARDS_COUNT' as const,
    newMinMaxCurrent
});

export const SetSortStatus = (newSortStatus:SortPackType) => ({
    type: 'TabletReducer/SET_SORT_STATUS' as const,
    newSortStatus
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
    cardPacksTotalCount: 0,
    maxCardsCount:  40,
    minCardsCount:  1,
    page: 1 ,
    pageCount: 10 ,
    currentPage: 1,
    sortStatus: 'none' as SortPackType
}

export type InitialStateTabletType = typeof InitialState

export const TabletReducer = (state: InitialStateTabletType = InitialState, action: AllTabletActionType): any => {
    switch (action.type) {
        case SET_TABLET_INFO :
            return {...state, cardPacks:[...action.newTabletInfo.cardPacks], cardPacksTotalCount:action.newTabletInfo.cardPacksTotalCount}
        case SET_CURRENT_PAGE :
            return {...state, currentPage:action.newPage}
        case SET_MIN_MAX_CARDS_COUNT :
            return {...state, minCardsCount:action.newMinMaxCurrent[0],maxCardsCount:action.newMinMaxCurrent[1]}
        case SET_SORT_STATUS :
            return {...state,sortStatus:action.newSortStatus }
        default:
            return state;
    }
}

export const getCarsPack = () => {
    return (dispatch: Dispatch, getState:()=>AppStoreType) => {
        const state = getState()
        const page =state.tablet.currentPage
        const pageCount = state.tablet.pageCount
        const minCardsCount = state.tablet.minCardsCount
        const maxCardsCount = state.tablet.maxCardsCount
        const sortStatus = state.tablet.sortStatus


        CardsPackAPI.getCards({page:page,pageCount:pageCount,min:minCardsCount,max:maxCardsCount,sortPacks:sortStatus})
            .then(res => {
                   dispatch(SetTabletInfo(res.data))
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
export type SetCurrentPageType = ReturnType<typeof SetCurrentPage>
export type SetMinMaxCardsCurrentType = ReturnType<typeof SetMinMaxCardsCurrent>
export type SetSortStatusType = ReturnType<typeof SetSortStatus>

export type AllTabletActionType = SetTabletInfoType|SetCurrentPageType|SetMinMaxCardsCurrentType|SetSortStatusType;

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
export type SortPackType = 'none'|'0cardsCount'|'1cardsCount'


export default TabletReducer;
























