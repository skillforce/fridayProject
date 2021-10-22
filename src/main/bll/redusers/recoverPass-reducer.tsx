import {Dispatch} from 'redux';
import {authAPI, forgotPassDataType, newPassDataType} from '../../dal/Api';
import {setIsLoading} from './login-reducer';
import {setSignUpProgress} from './registration-reducer';


const SET_IS_MESSAGE_SEND = 'AppReducer/SET_IS_MESSAGE_SEND';
const SET_ERROR_MESSAGE = 'AppReducer/SET_ERROR_MESSAGE';


export const SetIsMessageSend = (newStatus: isMessageSentStatusType) => ({
    type: 'AppReducer/SET_IS_MESSAGE_SEND' as const,
    newStatus
});
export const SetErrorRecoveryPassMessage = (newMess: string) => ({
    type: 'AppReducer/SET_ERROR_MESSAGE' as const,
    newMess
});


let InitialState = {
    isMessageSend: 'error' as isMessageSentStatusType,
    ErrorMessageRecoveryPassword: '' as string
}

export type InitialStateLoginType = typeof InitialState

export const RecoverPassReducer = (state: InitialStateLoginType = InitialState, action: ProfileReducerActionType): InitialStateLoginType => {
    switch (action.type) {
        case SET_IS_MESSAGE_SEND :
            return {...state, isMessageSend: action.newStatus}
        case SET_ERROR_MESSAGE :
            return {...state, ErrorMessageRecoveryPassword: action.newMess}
        default:
            return state;
    }
}

export const SendMessage = (data: forgotPassDataType) => {
    return (dispatch: Dispatch) => {
        dispatch(SetIsMessageSend('loading'))
        authAPI.forgotPass(data)
            .then(res => {
                    dispatch(SetIsMessageSend('sent'))
                }
            )
            .catch(error => {
                const errMsg = error.response ? error.response.data.error
                    : (error.message + ', more details in the console');
                dispatch(SetErrorRecoveryPassMessage(errMsg))
                dispatch(SetIsMessageSend('error'))
            })
            .finally(() => {
                    setTimeout(() => {
                        dispatch(SetIsMessageSend('end'))
                    }, 2000)
                }
            )
    }
}
export const CreateNewPassword = (data: newPassDataType) => {
    return (dispatch: Dispatch) => {
        dispatch(SetIsMessageSend('loading'))
        authAPI.setNewPass(data)
            .then(res => {
                    dispatch(SetIsMessageSend('sent'))
                }
            )
            .catch(error => {
                const errMsg = error.response ? error.response.data.error
                    : (error.message + ', more details in the console');
                dispatch(SetErrorRecoveryPassMessage(errMsg))
                dispatch(SetIsMessageSend('error'))
            })
            .finally(() => {
                    setTimeout(() => {
                        dispatch(SetIsMessageSend('end'))
                    }, 2000)
                }
            )
    }
}


//types

export type isMessageSentStatusType = 'sent' | 'loading' | 'error'|'end'

export type setIsMessageSendType = ReturnType<typeof SetIsMessageSend>
export type setErrorRecoveryPassMessageType = ReturnType<typeof SetErrorRecoveryPassMessage>

export type ProfileReducerActionType = setIsMessageSendType | setErrorRecoveryPassMessageType

export default RecoverPassReducer;












