import {Dispatch} from 'redux';
import {CardsPackAPI, CardsPackType, ParamsAddNewCardsType} from '../../dal/Api';
import {SetIsMessageSend} from './recoverPass-reducer';
import {AppStoreType} from '../store/store';



const SET_TABLET_INFO = 'TabletReducer/SET_TABLET_INFO';
const SET_CURRENT_PAGE = 'TabletReducer/SET_CURRENT_PAGE';
const SET_MIN_MAX_CARDS_COUNT = 'TabletReducer/SET_MIN_MAX_CARDS_COUNT';
const SET_SORT_STATUS = 'TabletReducer/SET_SORT_STATUS';
const SET_SEARCH_TEXT = 'TabletReducer/SET_SEARCH_TEXT';
const SET_SEARCHED_BY = 'TabletReducer/SET_SEARCHED_BY';


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

export const SetSearchText = (newText:string) => ({
    type: 'TabletReducer/SET_SEARCH_TEXT' as const,
    newText
});
export const SetSearchedBy = (newStatus:SearchTextType) => ({
    type: 'TabletReducer/SET_SEARCHED_BY' as const,
    newStatus
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
    minCardsCount:  0,
    page: 1 ,
    pageCount: 10 ,
    currentPage: 1,
    sortStatus: '0updated' as SortPackType,
    searchText:'',
    searchedBy: '' as SearchTextType
}

export type InitialStateTabletType = typeof InitialState

export const TabletReducer = (state: InitialStateTabletType = InitialState, action: AllTabletActionType): any => {
    switch (action.type) {
        case SET_TABLET_INFO :
            const revers = [...action.newTabletInfo.cardPacks].reverse()
            return {...state, cardPacks:[...action.newTabletInfo.cardPacks], cardPacksTotalCount:action.newTabletInfo.cardPacksTotalCount}
        case SET_CURRENT_PAGE :
            return {...state, currentPage:action.newPage}
        case SET_MIN_MAX_CARDS_COUNT :
            return {...state, minCardsCount:action.newMinMaxCurrent[0],maxCardsCount:action.newMinMaxCurrent[1]}
        case SET_SORT_STATUS :
            return {...state,sortStatus:action.newSortStatus }
        case SET_SEARCH_TEXT :
            return {...state,searchText:action.newText }
        case SET_SEARCHED_BY :
            return {...state,searchedBy:action.newStatus}
        default:
            return state;
    }
}

export const getCarsPack = (withId:boolean=false) => {
    return (dispatch: Dispatch, getState:()=>AppStoreType) => {
        const state = getState()
        const page =state.tablet.currentPage
        const pageCount = state.tablet.pageCount
        const min = state.tablet.minCardsCount
        const max = state.tablet.maxCardsCount
        const sortPacks = state.tablet.sortStatus
        const searchText = state.tablet.searchText
        const searchBy = state.tablet.searchedBy

       const user_id = withId? state.profile.profile._id:'';



        CardsPackAPI.getCards({page,pageCount,min,max,sortPacks,user_id})
            .then(res => {
                debugger
                switch (searchBy){
                    case 'By name':
                      return res.data.cardPacks !== null ? dispatch(SetTabletInfo({...res.data, cardPacks: res.data.cardPacks.filter((t:cardType) => t.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 )})) : dispatch(SetTabletInfo(res.data))
                    case 'By creator':
                        return res.data.cardPacks !== null ? dispatch(SetTabletInfo({...res.data, cardPacks: res.data.cardPacks.filter((t:cardType) => t.user_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 )})) : dispatch(SetTabletInfo(res.data))
                    case '':
                      return dispatch(SetTabletInfo(res.data))
                    default:
                        return dispatch(SetTabletInfo(res.data))
                }
                }
            )
            .catch(error => {
                    console.log(error)
                }
            )
    }

}


export const PostCards=(params:CardsPackType={name:'aaaaa'})=>{
    return (dispatch: Dispatch<any>, getState:()=>AppStoreType) => {
        CardsPackAPI.addNewCards(params)
            .then(res=> {
                dispatch(getCarsPack())
            })
            .catch(error=>console.log(error))
    }
}


//types


export type SetTabletInfoType = ReturnType<typeof SetTabletInfo>
export type SetCurrentPageType = ReturnType<typeof SetCurrentPage>
export type SetMinMaxCardsCurrentType = ReturnType<typeof SetMinMaxCardsCurrent>
export type SetSortStatusType = ReturnType<typeof SetSortStatus>
export type SetSearchTextType = ReturnType<typeof SetSearchText>
export type SetSearchedByType = ReturnType<typeof SetSearchedBy>

export type AllTabletActionType = SetTabletInfoType|SetCurrentPageType|SetMinMaxCardsCurrentType|SetSortStatusType|SetSearchTextType|SetSearchedByType;

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
export type SortPackType = '0cardsCount'|'1cardsCount'|'0name'|'1name'|'0updated'|'1updated'
export type SearchTextType = 'By name'|'By creator'|''


export default TabletReducer;
























