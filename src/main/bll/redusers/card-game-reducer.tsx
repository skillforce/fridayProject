import {OneCardsType, SetCardInfo, SetLoadingCardStatus, SetSearchCardEmpty} from './card-reducer';
import {Dispatch} from 'redux';
import {CardAPI} from '../../dal/Api';

const SET_IS_INIT_GAME_STATUS = 'cardGameReducer/SET_IS_INIT_GAME_STATUS';
const SET_SHOW_CARD = 'cardGameReducer/SET_SHOW_CARD'
const SET_ALL_CARDS_IN_DECK = 'cardGameReducer/SET_ALL_CARDS_IN_DECK'
const SET_ERROR_TEXT = 'cardGameReducer/SET_ERROR_TEXT'
const SET_MARK_VALUE = 'cardGameReducer/SET_MARK_VALUE'
const SET_IS_SHOW_ANSWER = 'cardGameReducer/SET_IS_SHOW_ANSWER'


export const setIsInitGameStatus = (newStatus: isInitGameStatusType) => ({
    type: 'cardGameReducer/SET_IS_INIT_GAME_STATUS' as const,
    newStatus
})
export const setShowCard = (newCard: OneCardsType) => ({
    type: 'cardGameReducer/SET_SHOW_CARD' as const,
    newCard
})
export const setAllCardsInDeck = (newCards: null | OneCardsType[] | OneCardsType) => ({
    type: 'cardGameReducer/SET_ALL_CARDS_IN_DECK' as const,
    newCards
})
export const setErrorText = (newText:string) => ({
    type: 'cardGameReducer/SET_ERROR_TEXT' as const,
    newText
})
export const setMarkValue = (newValue:number) => ({
    type: 'cardGameReducer/SET_MARK_VALUE' as const,
    newValue
})
export const setIsShowAnswer = (newStatus:boolean) => ({
    type: 'cardGameReducer/SET_IS_SHOW_ANSWER' as const,
    newStatus
})


const InitialCardGameState = {
    showCard: {} as OneCardsType,
    allCardsInDeck: null as null | OneCardsType[] | OneCardsType,
    isInitGameStatus: 'loading' as isInitGameStatusType,
    ErrorText: '' as string,
    markValue:0 as number,
    isShowAnswer:false as boolean
}


type InitialStateCardGameType = typeof InitialCardGameState


export const cardGameReducer = (state: InitialStateCardGameType = InitialCardGameState, action: cardGameAllActionsType): InitialStateCardGameType => {
    switch (action.type) {
        case SET_IS_INIT_GAME_STATUS:
            return {...state, isInitGameStatus: action.newStatus}
        case SET_SHOW_CARD:
            return {...state, showCard: action.newCard}
        case SET_ALL_CARDS_IN_DECK:
            return {...state, allCardsInDeck: action.newCards}
        case SET_ERROR_TEXT:
            return {...state, ErrorText: action.newText}
        case SET_MARK_VALUE:
            return {...state, markValue: action.newValue}
        case SET_IS_SHOW_ANSWER:
            return {...state, isShowAnswer: action.newStatus}
        default:
            return state
    }
}

export const gameInit = (cardsPack_id: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setIsInitGameStatus('loading'))
            dispatch(setIsShowAnswer(false))
            dispatch(setMarkValue(0))
            const res = await CardAPI.getCards({cardsPack_id,page: 1, pageCount: 100})
            if (res.data.cards.length !== 0) {
                dispatch(setAllCardsInDeck(res.data.cards))
                dispatch(setShowCard(getCard(res.data.cards)))
                Promise.all([res]).then(res => setTimeout(() => {
                    dispatch(setIsInitGameStatus('init'))
                }, 1000))
            }
        } catch (error) {
            dispatch(setIsInitGameStatus('error'))
            setTimeout(() => {
                dispatch(setIsInitGameStatus('redirect'))
            }, 1000)
            setTimeout(() => {
                dispatch(setIsInitGameStatus('loading'))
            }, 3000)
        }

        }

}


export const putMark=(grade:number,card_id:string,cardPackId:string)=>{
    return async (dispatch:Dispatch<any>)=>{
        dispatch(setIsInitGameStatus('loading'))
        try {
            const res = await CardAPI.gradeCard(grade,card_id);
            Promise.all([res]).then(res => setTimeout(() => {
                dispatch(gameInit(cardPackId))
            }, 0))
        }catch (err){
           dispatch(setIsInitGameStatus('error'))
            setTimeout(() => {
                dispatch(setIsInitGameStatus('redirect'))
            }, 1000)
            setTimeout(() => {
                dispatch(setIsInitGameStatus('loading'))
            }, 3000)
        }
    }
}



const getCard = (cards: OneCardsType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});


    return cards[res.id + 1];
}







//types


export type isInitGameStatusType = 'loading' | 'init' | 'error' | 'redirect'


type setIsInitGameStatusType = ReturnType<typeof setIsInitGameStatus>
type setShowCardType = ReturnType<typeof setShowCard>
type setAllCardsInDeckType = ReturnType<typeof setAllCardsInDeck>
type setErrorTextType = ReturnType<typeof setErrorText>
type setMarkValueType = ReturnType<typeof setMarkValue>
type setIsShowAnswerType = ReturnType<typeof setIsShowAnswer>

export type cardGameAllActionsType =
    setIsInitGameStatusType
    | setShowCardType | setAllCardsInDeckType|setErrorTextType|setMarkValueType|setIsShowAnswerType;