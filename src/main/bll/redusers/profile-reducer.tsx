import {profileAPI, SetProfileType} from '../../dal/Api';
import {Dispatch} from 'redux';
import {logInTrue, setIsLoading, setLoginError} from './login-reducer';

const SET_PROFILE = 'ProfileReducer/SET_PROFILE';

export type ProfileResponseType = {
    _id: string | null;
    email: string | null;
    name: string | null
    avatar?: string | null
    publicCardPacksCount: number | null// количество колод
    created: Date | null
    updated: Date | null
    isAdmin: boolean | null
    verified: boolean | null // подтвердил ли почту
    rememberMe: boolean | null
    error?: string | null
}


export const setProfile = (profile: ProfileResponseType) => ({type: 'ProfileReducer/SET_PROFILE' as const, profile});


let InitialState = {
    profile: {
        _id: null as string | null,
        email: null as string | null,
        name: null as string | null,
        avatar: null as string | null,
        publicCardPacksCount: null as number | null, // количество колод
        created: null as Date | null,
        updated: null as Date | null,
        isAdmin: null as boolean | null,
        verified: null as boolean | null,// подтвердил ли почту
        rememberMe: null as boolean | null,
        error: null as string | null,
    }
}

export type InitialStateLoginType = typeof InitialState

export const EditProfileTC = (Data: SetProfileType) => {
    return (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        profileAPI.setProfile(Data)
            .then(res => {
                    dispatch(setProfile(res.data.updatedUser))
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


export const ProfileReducer = (state: InitialStateLoginType = InitialState, action: ProfileReducerActionType): InitialStateLoginType => {
    switch (action.type) {
        case SET_PROFILE :
            return {...state, profile: {...state.profile, ...action.profile}}
        default:
            return state;
    }
}


//types

export type setProfileType = ReturnType<typeof setProfile>

export type ProfileReducerActionType = setProfileType

export default ProfileReducer;















