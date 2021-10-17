import {Dispatch} from 'redux';
import {authAPI, SignUpDataRequestType} from '../../dal/Api';
import {setIsLoading} from './login-reducer';


const REG_CORRECT = 'RegistrationReducer/REG_CORRECT';
const REG_ERROR = 'RegistrationReducer/REG_ERROR'
const SET_PROGRESS = 'RegistrationReducer/SET_PROGRESS'


export const setIsValidReg = (newStatus: boolean) => ({type: 'RegistrationReducer/REG_CORRECT' as const, newStatus});
export const setSignUpError = (ErrorMSG: string) => ({type: 'RegistrationReducer/REG_ERROR' as const, ErrorMSG});
export const setSignUpProgress = (NewProgress: NewProgressType) => ({
    type: 'RegistrationReducer/SET_PROGRESS' as const,
    NewProgress
});


let InitialState = {
    isValidReg: false,
    signUpProgress: 'loading' as NewProgressType,
    SignUpError: '',
}

type InitialStateLoginType = typeof InitialState

export const RegistrationReducer = (state: InitialStateLoginType = InitialState, action: RegistrationReducerActionType): InitialStateLoginType => {
    switch (action.type) {
        case REG_CORRECT :
            return {...state, isValidReg: action.newStatus}
        case REG_ERROR :
            return {...state, SignUpError: action.ErrorMSG}
        case SET_PROGRESS :
            return {...state, signUpProgress: action.NewProgress}
        default:
            return state;
    }
}


export const SignUpTC = (requestData: SignUpDataRequestType) => {
    return (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        authAPI.signUp(requestData)
            .then(res => {
                    dispatch(setIsValidReg(true))
                    dispatch(setSignUpProgress('success'))
                }
            )
            .catch(error => {
                const errMsg = error.response ? error.response.data.error
                    : (error.message + ', more details in the console');
                dispatch(setSignUpProgress('error'))
                dispatch(setSignUpError(errMsg))
            })
            .finally(() => {
                    setTimeout(() => {
                        dispatch(setIsLoading(false))
                        dispatch(setSignUpProgress('loading'))
                    }, 3000)
                }
            )
    }

}

//types

export type setIsValidRegType = ReturnType<typeof setIsValidReg>
export type setSignUpErrorType = ReturnType<typeof setSignUpError>
export type setProgressType = ReturnType<typeof setSignUpProgress>


export type NewProgressType = 'loading' | 'success' | 'error'


export type RegistrationReducerActionType = setIsValidRegType | setSignUpErrorType | setProgressType

export default RegistrationReducer;



