import {Dispatch} from 'redux';
import {authAPI} from '../../dal/Api';
import {setProfile} from './profile-reducer';
import {logInTrue, setLoginError} from './login-reducer';


const SET_IS_INITIALIZED = 'AppReducer/SET_IS_INITIALIZED';


export const SetIsInitialized = (newInitializedStatus: IsInitializedStatusType) => ({
    type: 'AppReducer/SET_IS_INITIALIZED' as const,
    newInitializedStatus
});


let InitialState = {
    isInitialized: 'loading' as IsInitializedStatusType
}

export type InitialStateLoginType = typeof InitialState

export const AppReducer = (state: InitialStateLoginType = InitialState, action: ProfileReducerActionType): InitialStateLoginType => {
    switch (action.type) {
        case SET_IS_INITIALIZED :
            return {...state, isInitialized: action.newInitializedStatus}
        default:
            return state;
    }
}

export const AuthMe = () => {
    return (dispatch: Dispatch) => {

        authAPI.authMe()
            .then(res => {
                    dispatch(setProfile(res.data))
                    dispatch(logInTrue(true))
                    dispatch(SetIsInitialized('success'))

                }
            )
            .catch(error => {
                const errMsg = error.response ? error.response.data.error
                    : (error.message + ', more details in the console');
                if(errMsg!='you are not authorized /ᐠ-ꞈ-ᐟ\\') {
                    dispatch(setLoginError(errMsg))
                }
                dispatch(SetIsInitialized('notInitialized'))
            })
    }
}


//types

export type IsInitializedStatusType = 'loading' | 'success' | 'notInitialized'

export type setInitializedType = ReturnType<typeof SetIsInitialized>

export type ProfileReducerActionType = setInitializedType

export default AppReducer;


















