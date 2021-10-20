import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from './EditProfile.module.css'
import EmptyAva from '../EmptyAva.png'
import {AppStoreType} from '../../../../bll/store/store';
import {EditProfileTC, InitialStateLoginType} from '../../../../bll/redusers/profile-reducer';
import {Preloader} from '../../../common/Preloader/Preloader';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../../routes/Routes';
import {useInput} from '../../login/login';
import SuperInputText from '../../../common/c1-SuperInputText/SuperInputText';
import {ErrorWindow} from '../../../common/ErrorWindow/ErrorWindow';

type EditModePropsType = {
    onClickHandler: (newStatus: boolean) => void
    isEditMode: boolean
}

const EditProfile = (props: EditModePropsType) => {


    const isLogin = useSelector<AppStoreType, boolean>(state => state.login.logIn);
    const isLoading = useSelector<AppStoreType, boolean>(state => state.login.isLoading);
    const profile = useSelector<AppStoreType, InitialStateLoginType>(state => state.profile)
    const dispatch = useDispatch();

    const {onClickHandler} = props

    const {
        _id,
        email,
        name,
        avatar
    } = profile.profile


    const nameInput = useInput(name, {isEmpty: true, minLength: 3, maxLength: 50})
    const avatarInput = useInput(avatar ? avatar : '', {isEmpty: true, minLength: 3, maxLength: 50})


    const saveClickHandler = (newName: string, newAva: string) => {
        const data = {
            name: newName ? newName : '',
            avatar: newAva ? newAva : ''
        }
        dispatch(EditProfileTC(data))
        onClickHandler(false)
    }


    if (isLoading) {
        return <Preloader/>
    }


    if (!isLogin) {
        return <Redirect to={PATH.LOGIN}/>
    }

    const isEmptyNameError = nameInput.isEmpty && nameInput.touched;
    const isEmptyUrlError = avatarInput.isEmpty && avatarInput.touched;

    return (
        <div className={cn.form}>
            <div className={cn.hTit}>
                It-incubator
            </div>
            <ErrorWindow isEmptyNameError={isEmptyNameError}/>

            <div>Name: <SuperInputText placeholder={nameInput.value ? '' : 'Enter your new nick name'} onChange={nameInput.onChange} onBlur={() => {
                nameInput.onBlur(true)
            }} value={nameInput.value} label={''}/></div>

            <div className={cn.ava_img}><img src={avatar ? avatar : EmptyAva} alt="avatar"/></div>
            <ErrorWindow isEmptyUrlError={isEmptyUrlError}/>
            <div>Avatar: <SuperInputText placeholder={avatarInput.value ? '' : 'Enter new image url'}
                                         onChange={avatarInput.onChange} onBlur={() => {
                avatarInput.onBlur(true)
            }} value={avatarInput.value} label={''}/></div>
            <div className={cn.tit}>
                <div>Email:{email}</div>
                <div>ID:{_id}</div>
            </div>
            <button disabled={!(nameInput.value && avatarInput.value)} onClick={() => {
                saveClickHandler(nameInput.value, avatarInput.value)
            }}>Save
            </button>
        </div>
    );
}

export default EditProfile;
