import React from 'react';
import cn from './setNewPassword.module.css';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import {NavLink, Redirect, useParams} from 'react-router-dom';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import {PATH} from '../../routes/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../bll/store/store';
import {useInput} from '../login/login';
import {CreateNewPassword, isMessageSentStatusType} from '../../../bll/redusers/recoverPass-reducer';
import {setLoginError} from '../../../bll/redusers/login-reducer';
import {ErrorWindow} from '../../common/ErrorWindow/ErrorWindow';


export const SetNewPassword = () => {
    const password = useInput('', {isEmpty: true, minLength: 7, maxLength: 20});
    const password1 = useInput('', {isEmpty: true, minLength: 7, maxLength: 20});
    const dispatch = useDispatch();
    const isMessageSentStatus = useSelector<AppStoreType, isMessageSentStatusType>(state => state.recoverPass.isMessageSend)
    const ErrorRequestMsg = useSelector<AppStoreType, string>(state => state.recoverPass.ErrorMessageRecoveryPassword);
    const isLogin = useSelector<AppStoreType, boolean>(state => state.login.logIn);
    const {token} = useParams<{ token: string }>();

    const onClickHandler = () => {
        const message = {
            password: password.value,
            resetPasswordToken: token
        }
        dispatch(CreateNewPassword(message))
    }

    if (password.touched || password.value) {
        dispatch(setLoginError(''))
    }


    const isEmptyPassMsg = password.touched && password.isEmpty;


    const minLengthPassMsg = password.touched && password.minLengthError;

    const maxLengthPassMsg = password.touched && password.maxLengthError;


    const isPasswordCorrectReEnter = password.value !== password1.value && password.touched;

    const isButtonDisabled = !password.inputValid || !password.inputValid || isPasswordCorrectReEnter;

    if (isLogin) {
        return <Redirect to={PATH.PROFILE}/>
    }

    if (isMessageSentStatus === 'loading') {
        return <div>loading...</div>
    }


    if (isMessageSentStatus === 'sent') {
        return (<div>
                <div>Succes!</div>
                <NavLink className={cn.linkforgot} to={PATH.LOGIN}>Sign in</NavLink>
            </div>
        )
    }


    return (
        <div className={cn.autorization}>
            <div className={cn.form}>
                <div className={cn.hTit}>
                    It-incubator
                </div>
                <div className={cn.tit}>
                    Create new password
                </div>
                <form>
                    {ErrorRequestMsg && <div>{ErrorRequestMsg}</div>}

                    <ErrorWindow isEmptyPassMsg={isEmptyPassMsg} minLengthPassMsg={minLengthPassMsg}
                                 maxLengthPassMsg={maxLengthPassMsg}/>


                    <SuperInputText onChange={password.onChange} onBlur={() => {
                        password.onBlur(true)
                    }} value={password.value}
                                    label={'Enter new unique password'} type={'password'}/>

                    <ErrorWindow isPasswordCorrectReEnter={isPasswordCorrectReEnter}/>
                    {isPasswordCorrectReEnter}


                    <SuperInputText onChange={password1.onChange} onBlur={() => {
                        password1.onBlur(true)
                    }} value={password1.value}
                                    label={'Repeat your password'} type={'password'}/>


                    <SuperButton disabled={isButtonDisabled} onClick={onClickHandler}
                                 style={{width: 280, marginTop: 80, marginBottom: 40}}>Create
                        new password</SuperButton>
                </form>
            </div>
        </div>
    );
}

export default SetNewPassword;
