import React from 'react';
import cn from './registation.module.css';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import {NavLink, Redirect} from 'react-router-dom';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../bll/store/store';
import {PATH} from '../../routes/Routes';
import {setSignUpError, SignUpTC} from '../../../bll/redusers/registration-reducer';
import {useInput} from '../login/login';
import {ErrorWindow} from '../../common/ErrorWindow/ErrorWindow';
import {Preloader} from '../../common/Preloader/Preloader';
import {ResponsePage} from '../../common/ResponsePage/ResponsePage';


const Registration = () => {

    const email = useInput('', {isEmpty: true, minLength: 3, maxLength: 50, isValidEmail: false});
    const password = useInput('', {isEmpty: true, minLength: 7, maxLength: 20});
    const password1 = useInput('', {isEmpty: true, minLength: 7, maxLength: 20});


    const isEmptyEmailMsg = email.touched && email.isEmpty;
    const isEmptyPassMsg = password.touched && password.isEmpty;
    //проверка на пустоту

    const minLengthEmailMsg = email.touched && email.minLengthError;
    const minLengthPassMsg = password.touched && password.minLengthError;
    // проверка на минимальную длинну

    const isValidEmailMsg = email.touched && email.isValidEmailError;
    const maxLengthPassMsg = password.touched && password.maxLengthError;
    // проверка на валидность имейла и максимальную длинну пароля

    const isLoginDisabled = email.inputValid && password.inputValid;
    //отключаем кнопку если хоть одна ошибка есть


    const isPasswordCorrectReEnter = password.value !== password1.value && password.touched;
    const isPasswordDublicate = password.value === password1.value;


    const dispatch = useDispatch();

    const isLogin = useSelector<AppStoreType, boolean>(state => state.login.logIn);
    const isLoading = useSelector<AppStoreType, boolean>(state => state.login.isLoading);
    const isCorrectReg = useSelector<AppStoreType, boolean>(state => state.registration.isValidReg);
    const SignUpErrorMsg = useSelector<AppStoreType, string>(state => state.registration.SignUpError);
    const signUpProgress = useSelector<AppStoreType, string>(state => state.registration.signUpProgress);


    const onClickHandler = () => {

        const requestData = {
            email: email.value,
            password: password.value,
        }

        dispatch(SignUpTC(requestData));

        email.onChange('')
        email.onBlur(false)
        password.onChange('')
        password.onBlur(false)
        password1.onBlur(false)
        password1.onChange('')

    } //обработка клика на кнопку SignUp


    if (email.touched || email.value || password.touched || password.value || password1.touched || password1.value) {
        dispatch(setSignUpError(''))
    } //зачищаем ошибки работы с сервером при попытки нового введения символов пользователем


    if (isLoading && signUpProgress === 'loading') {
        return <Preloader/>
    }
    if (isLoading && signUpProgress === 'success') {
        return <ResponsePage typeOfPage={'success'}/>
    }
    if (isLoading && signUpProgress === 'error') {
        return <ResponsePage typeOfPage={'error'}/>
    }

    if (isCorrectReg) {
        return <Redirect to={PATH.LOGIN}/>
    }

    if (isLogin) {
        return <Redirect to={PATH.PROFILE}/>
    }


    return (
        <div className={cn.autorization}>
            <div className={cn.form}>
                <div className={cn.hTit}>
                    It-incubator
                </div>
                <div className={cn.tit}>
                    Sign Up
                </div>
                <form>
                    {SignUpErrorMsg && <div style={{color: 'red'}}>{SignUpErrorMsg}</div>}

                    <ErrorWindow isEmptyEmailMsg={isEmptyEmailMsg} minLengthEmailMsg={minLengthEmailMsg}
                                 isValidEmailMsg={isValidEmailMsg}/>

                    <SuperInputText onChange={email.onChange} onBlur={() => {
                        email.onBlur(true)
                    }} value={email.value}
                                    label={'Enter your email'}/>

                    <ErrorWindow isEmptyPassMsg={isEmptyPassMsg} minLengthPassMsg={minLengthPassMsg}
                                 maxLengthPassMsg={maxLengthPassMsg}/>


                    <SuperInputText onChange={password.onChange} onBlur={() => {
                        password.onBlur(true)
                    }} value={password.value}
                                    label={'Enter your unique password'} type={'password'}/>

                    <ErrorWindow isPasswordCorrectReEnter={isPasswordCorrectReEnter}/>

                    <SuperInputText onChange={password1.onChange} onBlur={() => {
                        password1.onBlur(true)
                    }} value={password1.value}
                                    label={'Repeat your password'} type={'password'}/>


                    <NavLink className={cn.linkforgot} to={PATH.LOGIN}>Sign in</NavLink>
                    <SuperButton onClick={onClickHandler} disabled={!isPasswordDublicate || !isLoginDisabled}
                                 style={{width: 280, marginTop: 80, marginBottom: 40}}>Sign up</SuperButton>


                </form>
            </div>

        </div>
    );
}

export default Registration;
