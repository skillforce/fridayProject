import {Dispatch} from 'redux';
import {CardAPI, newCardDataType, newUpdateCardDataType} from '../../dal/Api';
import {AppStoreType} from '../store/store';
import {loadingStatusType} from './tablet-reducer';


const SET_CARD_INFO = 'CardReducer/SET_CARD_INFO';
const SET_LOADING_CARD_STATUS = 'CardReducer/SET_LOADING_CARD_STATUS';
const SET_PAGE = 'CardReducer/SET_PAGE';
const SET_GRADE_VALUE = 'CardReducer/SET_GRADE_VALUE';
const SET_SORT_CARD_STATUS = 'CardReducer/SET_SORT_CARD_STATUS';
const SET_SEARCH_CARD_TEXT = 'CardReducer/SET_SEARCH_CARD_TEXT';
const SET_SEARCHED_CARD_BY = 'CardReducer/SET_SEARCHED_CARD_BY';
const SET_SEARCH_CARD_MODE = 'CardReducer/SET_SEARCH_CARD_MODE';
const SET_SEARCH_EMPTY = 'CardReducer/SET_SEARCH_EMPTY';
const SET_SEARCH_CARD_ARR = 'CardReducer/SET_SEARCH_CARD_ARR';
const SET_PAGE_FOR_SEARCH_CARD_MODE = 'CardReducer/SET_PAGE_FOR_SEARCH_CARD_MODE';
const SET_PAGE_COUNT = 'CardReducer/SET_PAGE_COUNT';
const SET_ERROR_CARD_TEXT = 'CardReducer/SET_ERROR_CARD_TEXT';


export const SetCardInfo = (newCardInfo: InitialStateCardType) => ({
    type: 'CardReducer/SET_CARD_INFO' as const,
    newCardInfo
});

export const SetPage = (newPage: number) => ({
    type: 'CardReducer/SET_PAGE' as const,
    newPage
});
export const SetLoadingCardStatus = (newStatus: loadingStatusType) => ({
    type: 'CardReducer/SET_LOADING_CARD_STATUS' as const,
    newStatus
});
export const SetGradeValue = (newRangeValue: number[]) => ({
    type: 'CardReducer/SET_GRADE_VALUE' as const,
    newRangeValue
});
export const SetSortCardStatus = (newSortStatus: sortCardsStatusType) => ({
    type: 'CardReducer/SET_SORT_CARD_STATUS' as const,
    newSortStatus
});
export const SetSearchCardText = (newText: string) => ({
    type: 'CardReducer/SET_SEARCH_CARD_TEXT' as const,
    newText
});
export const SetSearchedCardBy = (newStatus: SearchCardTextType) => ({
    type: 'CardReducer/SET_SEARCHED_CARD_BY' as const,
    newStatus
});
export const SetSearchCardMode = (newStatus: boolean) => ({
    type: 'CardReducer/SET_SEARCH_CARD_MODE' as const,
    newStatus
});
export const SetSearchCardEmpty = (newText: string) => ({
    type: 'CardReducer/SET_SEARCH_EMPTY' as const,
    newText
});
export const SetSearchCardArr = (newArr: Array<OneCardsType[]> | null) => ({
    type: 'CardReducer/SET_SEARCH_CARD_ARR' as const,
    newArr
});
export const SetPageForSearchCardMode = (newPage: number) => ({
    type: 'CardReducer/SET_PAGE_FOR_SEARCH_CARD_MODE' as const,
    newPage
});
export const SetPageCount = (newPage: number) => ({
    type: 'CardReducer/SET_PAGE_COUNT' as const,
    newPage
});
export const SetErrorCardText = (newText: string) => ({
    type: 'CardReducer/SET_ERROR_CARD_TEXT' as const,
    newText
});


let InitialState = {
    cards: [] as OneCardsType[],
    searchCardArr: null as Array<OneCardsType[]> | null,
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 5,
    page: 1,
    pageCount: 4,
    packUserId: '' as string,
    gradeValue: [0, 5],
    loadingStatusCard: 'success' as loadingStatusCardType,
    sortCards: '0update' as sortCardsStatusType,
    searchCardText: '',
    searchedCardBy: '' as SearchCardTextType,
    searchCardMode: false as boolean,
    searchCardEmpty: '' as string,
    pageForSearchCardMode: 0 as number,
    errorCardText: '' as string
}

export type InitialStateCardType = typeof InitialState

export const CardReducer = (state: InitialStateCardType = InitialState, action: AllTabletActionType): any => {
    switch (action.type) {
        case SET_CARD_INFO :
            return {...state, ...action.newCardInfo}
        case SET_LOADING_CARD_STATUS :
            return {...state, loadingStatusCard: action.newStatus}
        case SET_PAGE :
            return {...state, page: action.newPage}
        case SET_GRADE_VALUE :
            return {...state, gradeValue: action.newRangeValue}
        case SET_SORT_CARD_STATUS :
            return {...state, sortCards: action.newSortStatus}
        case SET_SEARCH_CARD_TEXT :
            return {...state, searchCardText: action.newText}
        case SET_SEARCHED_CARD_BY :
            return {...state, searchedCardBy: action.newStatus}
        case SET_SEARCH_CARD_MODE :
            return {...state, searchCardMode: action.newStatus}
        case SET_SEARCH_EMPTY :
            return {...state, searchCardEmpty: action.newText}
        case SET_SEARCH_CARD_ARR :
            return {...state, searchCardArr: action.newArr}
        case SET_PAGE_FOR_SEARCH_CARD_MODE :
            return {...state, pageForSearchCardMode: action.newPage}
        case SET_PAGE_COUNT :
            return {...state, pageCount: action.newPage}
        case SET_ERROR_CARD_TEXT :
            return {...state, errorCardText: action.newText}
        default:
            return state;
    }
}

export const getCard = (id: string) => {
    return (dispatch: Dispatch, getState: () => AppStoreType) => {
        const state = getState()
        const page = state.card.page
        const pageCount = state.card.pageCount
        const gradeValue = state.card.gradeValue
        const sortCards = state.card.sortCards
        dispatch(SetLoadingCardStatus('loading'));
        const promise = CardAPI.getCards({
            cardsPack_id: id,
            page,
            pageCount,
            min: gradeValue[0],
            max: gradeValue[1],
            sortCards
        })
            .then(res => {
                    if (res.data.cards.length !== 0) {
                        dispatch(SetSearchCardEmpty(''))
                        dispatch(SetCardInfo(res.data))
                    } else {
                        dispatch(SetCardInfo({...res.data, cardsTotalCount: 1, cards: []}))
                        dispatch(SetSearchCardEmpty('not found any cards'))
                    }
                }
            )
            .catch(error => {
                dispatch(SetErrorCardText(error.toString()))
                dispatch(SetLoadingCardStatus('error'));
                setTimeout(() => {
                    dispatch(SetLoadingCardStatus('redirect'))
                }, 3000)

            })
        Promise.all([promise]).then(res => setTimeout(() => {
                dispatch(SetLoadingCardStatus('success'))
            }, 2000)
        )
    }

}


export const searchCard = (id: string) => {
    debugger
    return (dispatch: Dispatch, getState: () => AppStoreType) => {
        const state = getState()
        const gradeValue = state.card.gradeValue
        const sortCards = state.card.sortCards
        const searchedCardBy = state.card.searchedCardBy
        const searchCardText = state.card.searchCardText
        const pageCount = state.card.pageCount
        dispatch(SetLoadingCardStatus('loading'));
        const promise = CardAPI.getCards({
            cardsPack_id: id,
            page: 1,
            pageCount: 100,
            min: gradeValue[0],
            max: gradeValue[1],
            sortCards
        })
            .then(res => {
                    if (searchedCardBy === 'By question') {

                        const newCardsPacks = res.data.cards.filter((t: OneCardsType) => t.question.toLowerCase().indexOf(searchCardText.toLowerCase()) !== -1)
                        const newTotalCount = newCardsPacks.length
                        const temp = []
                        if (newCardsPacks.length !== 0) {
                            while (newCardsPacks.length > 0) {
                                temp.push(newCardsPacks.splice(0, 4))
                            }
                            dispatch(SetSearchCardEmpty(''))
                            dispatch(SetSearchCardMode(true))
                            dispatch(SetSearchCardArr(temp))
                            dispatch(SetCardInfo({...res.data, cardsTotalCount: newTotalCount, cards: []}))
                        } else {
                            dispatch(SetSearchCardMode(true))
                            dispatch(SetSearchCardArr(null))
                            dispatch(SetCardInfo({...res.data, cardsTotalCount: 1, cards: []}))
                            dispatch(SetSearchCardEmpty('not found by this question'))

                        }
                    }
                    if (searchedCardBy === 'By answer') {
                        const newCardsPacks = res.data.cards.filter((t: OneCardsType) => t.answer.toLowerCase().indexOf(searchCardText.toLowerCase()) !== -1)
                        const newTotalCount = newCardsPacks.length
                        const temp = []
                        if (newCardsPacks.length !== 0) {
                            while (newCardsPacks.length > 0) {
                                temp.push(newCardsPacks.splice(0, 4))
                            }
                            dispatch(SetSearchCardEmpty(''))
                            dispatch(SetSearchCardMode(true))
                            dispatch(SetSearchCardArr(temp))
                            dispatch(SetCardInfo({...res.data, cardsTotalCount: newTotalCount, cards: []}))
                        } else {
                            dispatch(SetSearchCardMode(true))
                            dispatch(SetSearchCardArr(null))
                            dispatch(SetCardInfo({...res.data, cardsTotalCount: 1, cards: []}))
                            dispatch(SetSearchCardEmpty('not found by this answer'))
                        }
                    }

                }
            )
            .catch(error => {
                dispatch(SetErrorCardText(error.toString()))
                dispatch(SetLoadingCardStatus('error'));
                setTimeout(() => {
                    dispatch(SetLoadingCardStatus('redirect'))
                }, 3000)

            })
        Promise.all([promise]).then(res => setTimeout(() => {
                dispatch(SetLoadingCardStatus('success'))
            }, 2000)
        )
    }

}


export const AddCard = (newCardParams: newCardDataType) => {
    return (dispatch: Dispatch<any>, getState: () => AppStoreType) => {
        dispatch(SetLoadingCardStatus('loading'));
        const searchMode = getState().card.searchCardMode
        CardAPI.addNewCards(newCardParams)
            .then(res => searchMode? dispatch(searchCard(newCardParams.cardsPack_id)) : dispatch(getCard(newCardParams.cardsPack_id)))
            .catch(error => {
                dispatch(SetErrorCardText(error.toString()))
                dispatch(SetLoadingCardStatus('error'));
                setTimeout(() => {
                    dispatch(SetLoadingCardStatus('redirect'))
                }, 3000)
            })
    }
}
export const UpdateCard = (newCardParams: newUpdateCardDataType, cardsPack_id: string) => {
    return (dispatch: Dispatch<any>, getState: () => AppStoreType) => {
        dispatch(SetLoadingCardStatus('loading'));
        const searchMode = getState().card.searchCardMode
        CardAPI.updateCard(newCardParams)
            .then(res =>  searchMode?  dispatch(searchCard(cardsPack_id)) : dispatch(getCard(cardsPack_id)))
            .catch(error => {
                dispatch(SetErrorCardText(error.toString()))
                dispatch(SetLoadingCardStatus('error'));
                setTimeout(() => {
                    dispatch(SetLoadingCardStatus('redirect'))
                }, 3000)

            })
    }
}

export const DeleteCard = (cardId: string, cardsPack_id: string) => {

    return (dispatch: Dispatch<any>, getState: () => AppStoreType) => {
        debugger
        const searchMode = getState().card.searchCardMode
        dispatch(SetLoadingCardStatus('loading'));
        CardAPI.deleteCard(cardId)
            .then(res =>  searchMode?  dispatch(searchCard(cardsPack_id)) : dispatch(getCard(cardsPack_id)))
            .catch(error => {
                dispatch(SetErrorCardText(error.toString()))
                dispatch(SetLoadingCardStatus('error'));
                setTimeout(() => {
                    dispatch(SetLoadingCardStatus('redirect'))
                }, 3000)
            })
    }
}


//types


export type SetCardInfoType = ReturnType<typeof SetCardInfo>
export type SetLoadingCardStatusType = ReturnType<typeof SetLoadingCardStatus>
export type SetPageType = ReturnType<typeof SetPage>
export type SetGradeValueType = ReturnType<typeof SetGradeValue>
export type SetSortCardStatusType = ReturnType<typeof SetSortCardStatus>
export type SetSearchCardTextType = ReturnType<typeof SetSearchCardText>
export type SetSearchedCardByType = ReturnType<typeof SetSearchedCardBy>
export type SetSearchCardModeType = ReturnType<typeof SetSearchCardMode>
export type SetSearchCardEmptyType = ReturnType<typeof SetSearchCardEmpty>
export type SetSearchCardArrType = ReturnType<typeof SetSearchCardArr>
export type SetPageForSearchCardModeType = ReturnType<typeof SetPageForSearchCardMode>
export type SetPageCountType = ReturnType<typeof SetPageCount>
export type SetErrorCardTextType = ReturnType<typeof SetErrorCardText>

export type AllTabletActionType =
    SetCardInfoType
    | SetLoadingCardStatusType
    | SetPageType
    | SetGradeValueType
    | SetSortCardStatusType
    | SetSearchCardTextType
    | SetSearchedCardByType
    | SetSearchCardModeType
    | SetSearchCardEmptyType
    | SetSearchCardArrType
    | SetPageForSearchCardModeType
    | SetPageCountType
    | SetErrorCardTextType


export type OneCardsType = {
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
export type sortCardsStatusType =
    '0grade'
    | '1grade'
    | '0updated'
    | '1updated'
    | '1question'
    | '0question'
    | '0answer'
    | '1answer'
export type SearchCardTextType = 'By question' | 'By answer' | ''
export type loadingStatusCardType = 'success' | 'error' | 'loading' | 'redirect'


export default CardReducer;
























