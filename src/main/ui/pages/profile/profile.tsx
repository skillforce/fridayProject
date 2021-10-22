import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {AppStoreType} from '../../../bll/store/store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../routes/Routes';
import {InitialStateLoginType} from '../../../bll/redusers/profile-reducer';
import {Preloader} from '../../common/Preloader/Preloader';
import cn from './profile.module.css';
import EmptyAva from './EmptyAva.png'
import EditProfile from './EditProfile/EditProfile';


const Profile = () => {

    const isLogin = useSelector<AppStoreType, boolean>(state => state.login.logIn);
    const ErrorRequestMsg = useSelector<AppStoreType, string>(state => state.login.logInError);
    const isLoading = useSelector<AppStoreType, boolean>(state => state.login.isLoading);
    const profile = useSelector<AppStoreType, InitialStateLoginType>(state => state.profile)


    const[isEditMode, setIsEditMode]=useState(false)

    const onClickHandler=(newStatus:boolean)=>{
        setIsEditMode(newStatus)
    }

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
        return <Preloader/>
    }


    if (!isLogin) {
        return <Redirect to={PATH.LOGIN}/>
    }


    return (
         <div className={cn.autorization}>
             {!isEditMode &&<div className={cn.form}>
                <div className={cn.hTit}>
                    It-incubator
                </div>
                 <div className={cn.nameProfile}>{name}</div>
                <div className={cn.ava_img}><img src={avatar? avatar : EmptyAva} alt="avator"/></div>
                <div className={cn.tit}>
                    <div >Email:{email}</div>
                    <div>ID:{_id}</div>
                </div>
                <button onClick={()=>{onClickHandler(true)}}>Edit profile</button>
            </div>}
             {isEditMode && <EditProfile onClickHandler={onClickHandler} isEditMode={isEditMode} />}

        </div>
    );
}

export default Profile;
