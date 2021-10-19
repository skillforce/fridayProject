import React from 'react';
import cn from './recoverPass.module.css';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import {NavLink, Redirect} from 'react-router-dom';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import {PATH} from '../../routes/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../bll/store/store';
import {useInput} from '../login/login';
import {isMessageSentStatusType, SendMessage} from '../../../bll/redusers/recoverPass-reducer';
import {setLoginError} from '../../../bll/redusers/login-reducer';
import {ErrorWindow} from '../../common/ErrorWindow/ErrorWindow';
import {Preloader} from '../../common/Preloader/Preloader';
import {ResponsePage} from '../../common/ResponsePage/ResponsePage';


const RecoverPass = () => {
    const email = useInput('', {isEmpty: true, minLength: 3, maxLength: 50, isValidEmail: false});
    const dispatch = useDispatch();
    const isMessageSentStatus = useSelector<AppStoreType, isMessageSentStatusType>(state => state.recoverPass.isMessageSend)
    const ErrorRequestMsg = useSelector<AppStoreType, string>(state => state.recoverPass.ErrorMessageRecoveryPassword);
    const isLogin = useSelector<AppStoreType, boolean>(state => state.login.logIn);


    const onClickHandler = () => {
        const message = {
            email: email.value,
            from: 'test-front-admin <skillforce@mail.ru>',
            message: `<div style="background-color: lime; padding: 15px">	
	        password recovery link: 
	        <a href='http://localhost:3000/#/set-new-password/$token$'>
	        link</a></div>`
        }
        dispatch(SendMessage(message))
    }

    if (email.touched || email.value) {
        dispatch(setLoginError(''))
    }

    const minLengthEmailMsg = email.touched && email.minLengthError;
    const isValidEmailMsg = email.touched && email.isValidEmailError;
    const isEmptyEmailMsg = email.touched && email.isEmpty;
    const isLoginDisabled = !email.inputValid && !minLengthEmailMsg;


    if (isLogin) {
        return <Redirect to={PATH.PROFILE}/>
    }

    if (isMessageSentStatus === 'loading') {
        return <Preloader/>
    }


    if (isMessageSentStatus === 'sent') {
        return <ResponsePage typeOfPage={'sent'} email={email.value}/>
    }


    return (
        <div className={cn.autorization}>
            <div className={cn.form}>
                <div className={cn.hTit}>
                    It-incubator
                </div>
                <div className={cn.tit}>
                    Forgot your password?
                </div>


                <ErrorWindow minLengthEmailMsg={minLengthEmailMsg} isValidEmailMsg={isValidEmailMsg}
                             isEmptyEmailMsg={isEmptyEmailMsg}/>


                <form action="">
                    {ErrorRequestMsg && <div>{ErrorRequestMsg}</div>}

                    <SuperInputText onChange={email.onChange} onBlur={() => {
                        email.onBlur(true)
                    }} value={email.value}
                                    label={'Email'}/>


                    <NavLink className={cn.linkforgot} to={PATH.LOGIN}>Try Log In</NavLink>


                    <SuperButton disabled={isLoginDisabled} onClick={onClickHandler}
                                 style={{width: 280, marginTop: 80, marginBottom: 40}}>SEND
                        MESSAGE</SuperButton>


                </form>
            </div>
        </div>
    );
}

export default RecoverPass;
