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
const SET_SEARCH_CARDS_ARR = 'TabletReducer/SET_SEARCH_CARDS_ARR';
const SET_SEARCH_MODE = 'TabletReducer/SET_SEARCH_MODE';
const SET_PAGE_FOR_SEARCH_MODE = 'TabletReducer/SET_PAGE_FOR_SEARCH_MODE';


export const SetTabletInfo = (newTabletInfo: InitialStateTabletType) => ({
    type: 'TabletReducer/SET_TABLET_INFO' as const,
    newTabletInfo
});

export const SetCurrentPage = (newPage: number) => ({
    type: 'TabletReducer/SET_CURRENT_PAGE' as const,
    newPage
});

export const SetMinMaxCardsCurrent = (newMinMaxCurrent: number[]) => ({
    type: 'TabletReducer/SET_MIN_MAX_CARDS_COUNT' as const,
    newMinMaxCurrent
});

export const SetSortStatus = (newSortStatus: SortPackType) => ({
    type: 'TabletReducer/SET_SORT_STATUS' as const,
    newSortStatus
});

export const SetSearchText = (newText: string) => ({
    type: 'TabletReducer/SET_SEARCH_TEXT' as const,
    newText
});
export const SetSearchedBy = (newStatus: SearchTextType) => ({
    type: 'TabletReducer/SET_SEARCHED_BY' as const,
    newStatus
});
export const SetSearchCardsArr = (newCards: cardType[]) => ({
    type: 'TabletReducer/SET_SEARCH_CARDS_ARR' as const,
    newCards
});
export const SetSearchMode = (newMode: boolean) => ({
    type: 'TabletReducer/SET_SEARCH_MODE' as const,
    newMode
});
export const SetPageForSearchMode = (newPage: number) => ({
    type: 'TabletReducer/SET_PAGE_FOR_SEARCH_MODE' as const,
    newPage
});


let InitialState = {
    cardPacks: [] as cardType[],
    searchCardsArr: null as Array<cardType[]> | null,
    cardPacksTotalCount: 0,
    maxCardsCount: 40,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    currentPage: 1,
    sortStatus: '0updated' as SortPackType,
    searchText: '',
    searchedBy: '' as SearchTextType,
    searchMode: false as boolean,
    pageForSearchMode: 0 as number
}

export type InitialStateTabletType = typeof InitialState

export const TabletReducer = (state: InitialStateTabletType = InitialState, action: AllTabletActionType): any => {
    switch (action.type) {
        case SET_TABLET_INFO :
            return {
                ...state,
                cardPacks: [...action.newTabletInfo.cardPacks],
                cardPacksTotalCount: action.newTabletInfo.cardPacksTotalCount
            }
        case SET_CURRENT_PAGE :
            return {...state, currentPage: action.newPage}
        case SET_MIN_MAX_CARDS_COUNT :
            return {...state, minCardsCount: action.newMinMaxCurrent[0], maxCardsCount: action.newMinMaxCurrent[1]}
        case SET_SORT_STATUS :
            return {...state, sortStatus: action.newSortStatus}
        case SET_SEARCH_TEXT :
            return {...state, searchText: action.newText}
        case SET_SEARCHED_BY :
            return {...state, searchedBy: action.newStatus}
        case SET_SEARCH_CARDS_ARR :
            return {...state, searchCardsArr: action.newCards}
        case SET_SEARCH_MODE :
            return {...state, searchMode: action.newMode}
        case SET_PAGE_FOR_SEARCH_MODE :
            return {...state, pageForSearchMode: action.newPage}
        default:
            return state;
    }
}

export const getCarsPack = (withId: boolean = false) => {
    return (dispatch: Dispatch, getState: () => AppStoreType) => {
        const state = getState()
        const page = state.tablet.currentPage
        const pageCount = state.tablet.pageCount
        const min = state.tablet.minCardsCount
        const max = state.tablet.maxCardsCount
        const sortPacks = state.tablet.sortStatus
        const searchText = state.tablet.searchText
        const searchBy = state.tablet.searchedBy
        const user_id = withId ? state.profile.profile._id : '';


        CardsPackAPI.getCards({page, pageCount, min, max, sortPacks, user_id})
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




export const SearchCorrectCards = (withId: boolean = false) => {
    return (dispatch: Dispatch, getState: () => AppStoreType) => {
        const state = getState()
        const searchText = state.tablet.searchText
        const searchBy = state.tablet.searchedBy
        const min = state.tablet.minCardsCount
        const max = state.tablet.maxCardsCount
        const sortPacks = state.tablet.sortStatus
        const user_id = withId ? state.profile.profile._id : '';


        CardsPackAPI.getCards({page: 1, pageCount: 4000, min, max, sortPacks, user_id})
            .then(res => {
                    if (searchBy === 'By name') {
                        const newCardsPacks = res.data.cardPacks.filter((t: cardType) => t.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
                        const newCurrentPage = newCardsPacks.length
                        const temp = []
                        while (newCardsPacks.length > 0) {
                            temp.push(newCardsPacks.splice(0, 10))
                        }
                        dispatch(SetSearchMode(true))
                        dispatch(SetSearchCardsArr(temp))
                        dispatch(SetTabletInfo({...res.data, cardPacksTotalCount: newCurrentPage, cardPacks: []}))
                    }
                    if (searchBy === 'By creator') {
                        const newCardsPacks = res.data.cardPacks.filter((t: cardType) => t.user_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
                        const newCurrentPage = newCardsPacks.length
                        const temp = []
                        while (newCardsPacks.length > 0) {
                            temp.push(newCardsPacks.splice(0, 10))
                        }
                        dispatch(SetSearchMode(true))
                        dispatch(SetSearchCardsArr(temp))
                        dispatch(SetTabletInfo({...res.data, cardPacksTotalCount: newCurrentPage, cardPacks: []}))
                    }
                    if (searchBy === '') {
                        dispatch(SetTabletInfo(res.data))
                    }
                }
            )
            .catch(error => {
                    console.log(error)
                }
            )
    }

}


export const PostCards = (params: CardsPackType = {name: 'aaaaa'}) => {
    return (dispatch: Dispatch<any>, getState: () => AppStoreType) => {
        CardsPackAPI.addNewCards(params)
            .then(res => {
                dispatch(getCarsPack())
            })
            .catch(error => console.log(error))
    }
}


//types


export type SetTabletInfoType = ReturnType<typeof SetTabletInfo>
export type SetCurrentPageType = ReturnType<typeof SetCurrentPage>
export type SetMinMaxCardsCurrentType = ReturnType<typeof SetMinMaxCardsCurrent>
export type SetSortStatusType = ReturnType<typeof SetSortStatus>
export type SetSearchTextType = ReturnType<typeof SetSearchText>
export type SetSearchedByType = ReturnType<typeof SetSearchedBy>
export type SetSearchCardsArrType = ReturnType<typeof SetSearchCardsArr>
export type SetSearchModeType = ReturnType<typeof SetSearchMode>
export type SetPageForSearchModeType = ReturnType<typeof SetPageForSearchMode>

export type AllTabletActionType =
    SetTabletInfoType
    | SetCurrentPageType
    | SetMinMaxCardsCurrentType
    | SetSortStatusType
    | SetSearchTextType
    | SetSearchedByType
    | SetSearchCardsArrType
    | SetSearchModeType | SetPageForSearchModeType;

export type cardType = {
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
    user_name: string
}
export type SortPackType = '0cardsCount' | '1cardsCount' | '0name' | '1name' | '0updated' | '1updated'
export type SearchTextType = 'By name' | 'By creator' | ''


export default TabletReducer;
























