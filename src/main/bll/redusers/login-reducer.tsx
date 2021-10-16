import {Dispatch} from 'redux';
import {authAPI, RequestDataType} from '../../dal/Api';


const LOGIN_USER_TRUE = 'LoginPageReducer/LOGIN_TRUE';
const SET_LOGIN_ERROR = 'LoginPageReducer/SET_LOGIN_ERROR';
const SET_LOADING = 'LoginPageReducer/SET_LOADING';


export const logInTrue = (newLoginStatus: boolean) => ({type: 'LoginPageReducer/LOGIN_TRUE' as const, newLoginStatus});
export const setLoginError = (ErrorMSG: string) => ({type: 'LoginPageReducer/SET_LOGIN_ERROR' as const, ErrorMSG});
export const setIsLoading = (newLoadingStatus: boolean) => ({
    type: 'LoginPageReducer/SET_LOADING' as const,
    newLoadingStatus
});


let InitialState = {
    logIn: false,
    logInError: '',
    isLoading: false
}

type InitialStateLoginType = typeof InitialState

export const LoginReducer = (state: InitialStateLoginType = InitialState, action: LoginReducerActionType): InitialStateLoginType => {
    switch (action.type) {
        case LOGIN_USER_TRUE :
            return {...state, logIn: action.newLoginStatus}
        case SET_LOGIN_ERROR :
            return {...state, logInError: action.ErrorMSG}
        case SET_LOADING :
            return {...state, isLoading: action.newLoadingStatus}
        default:
            return state;
    }
}


export const logInTC = (requestData: RequestDataType) => {
    return (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        authAPI.login(requestData)
            .then(res => {
                    dispatch(logInTrue(true))
                }
            )
            .catch(error => {
                const errMsg = error.response ? error.response.data.error
                    : (error.message + ', more details in the console');
                dispatch(setLoginError(errMsg))

            })
            .finally(() => {
                    dispatch(setIsLoading(false))
                }
            )


    }

}

//types

export type LogInTrueType = ReturnType<typeof logInTrue>
export type SetLoginErrorType = ReturnType<typeof setLoginError>
export type SetLoadingType = ReturnType<typeof setIsLoading>


export type LoginReducerActionType = LogInTrueType | SetLoginErrorType | SetLoadingType

export default LoginReducer;
