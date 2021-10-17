import React from 'react';
import {useSelector} from 'react-redux';
import {AppStoreType} from '../../../bll/store/store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../routes/Routes';
import {InitialStateLoginType} from '../../../bll/redusers/profile-reducer';


const Profile = () => {

    const isLogin = useSelector<AppStoreType, boolean>(state => state.login.logIn);
    const ErrorRequestMsg = useSelector<AppStoreType, string>(state => state.login.logInError);
    const isLoading = useSelector<AppStoreType, boolean>(state => state.login.isLoading);
    const profile = useSelector<AppStoreType, InitialStateLoginType>(state => state.profile)

    const {
        _id,
        email,
        name,
        avatar,
        publicCardPacksCount,
        created,
        updated,
        isAdmin,
        verified,
        rememberMe,
        error
    } = profile.profile


    if (isLoading) {
        return (<div>...loading</div>)
    }


    if (!isLogin) {
        return <Redirect to={PATH.LOGIN}/>
    }


    return (
        <div>
            {ErrorRequestMsg && <div>{ErrorRequestMsg}</div>}
            <div>Name:{name}</div>
            {avatar && <img src={avatar} alt="ava"/>}
            <div>id:{_id}</div>
            <div>Email:{email}</div>
            <div>avatarURL:{avatar}</div>
        </div>
    );
}

export default Profile;
