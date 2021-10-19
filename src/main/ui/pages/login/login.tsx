import React, {ChangeEvent, useEffect, useState} from 'react';
import cn from './Login.module.css';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import {NavLink, Redirect} from 'react-router-dom';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import {useDispatch, useSelector} from 'react-redux';
import {logInTC, setLoginError} from '../../../bll/redusers/login-reducer';
import {AppStoreType} from '../../../bll/store/store';
import {PATH} from '../../routes/Routes';
import {setIsValidReg} from '../../../bll/redusers/registration-reducer';
import {ErrorWindow} from '../../common/ErrorWindow/ErrorWindow';


type ValidatorType = {
    isEmpty: boolean
    minLength: number
    maxLength: number,
    isValidEmail?: boolean
}

const useValidator = (value: any, validator: ValidatorType) => {

    const [isEmpty, setIsEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [maxLengthError, setMaxLengthError] = useState(false);
    const [isValidEmailError, setIsValidEmailError] = useState(false);
    const [inputValid, setInputValid] = useState(false);


    useEffect(() => {
        for (const valid in validator) {
            switch (valid) {
                case 'minLength':
                    value.length < validator[valid] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true)
                    break;
                case 'maxLength':
                    value.length > validator[valid] ? setMaxLengthError(true) : setMaxLengthError(false)
                    break;
                case 'isValidEmail':
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    re.test(String(value).toLowerCase()) ? setIsValidEmailError(false) : setIsValidEmailError(true)
                    break;
            }
        }
    }, [value])


    useEffect(() => {
        if (isEmpty || minLengthError || maxLengthError || isValidEmailError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, minLengthError, maxLengthError, isValidEmailError])


    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        isValidEmailError,
        inputValid
    }


}


export const useInput = (initialValue: any, validator: ValidatorType) => {
    const [value, setValue] = useState(initialValue);
    const [touched, setTouched] = useState(false);

    const valid = useValidator(value, validator)

    const onChange = (e: ChangeEvent<HTMLInputElement> | any) => {
        if (e.hasOwnProperty('target')) {
            setValue(e.target.value)
        } else {
            setValue(e)
        }
    }

    const onBlur = (t: boolean) => {
        setTouched(t)
    }

    return {
        value,
        touched,
        onChange,
        onBlur,
        ...valid
    }

}


const Login = () => {

    const email = useInput('', {isEmpty: true, minLength: 3, maxLength: 50, isValidEmail: false});
    const password = useInput('', {isEmpty: true, minLength: 7, maxLength: 20});
    const rememberMe = useInput(false, {isEmpty: true, minLength: 7, maxLength: 20});

    const isEmptyEmailMsg = email.touched && email.isEmpty;
    const isEmptyPassMsg = password.touched && password.isEmpty
    //проверка на пустоту

    const minLengthEmailMsg = email.touched && email.minLengthError;
    const minLengthPassMsg = password.touched && password.minLengthError;
    // проверка на минимальную длинну

    const isValidEmailMsg = email.touched && email.isValidEmailError;
    const maxLengthPassMsg = password.touched && password.maxLengthError;
    // проверка на валидность имейла и максимальную длинну пароля


    const isLoginDisabled = !email.inputValid || !password.inputValid;
    //отключаем кнопку если хоть одна ошибка есть

    const dispatch = useDispatch();

    const ErrorRequestMsg = useSelector<AppStoreType, string>(state => state.login.logInError);
    const isLogin = useSelector<AppStoreType, boolean>(state => state.login.logIn);
    const isLoading = useSelector<AppStoreType, boolean>(state => state.login.isLoading);


    const onClickHandler = () => {
        const requestData = {
            email: email.value,
            password: password.value,
            rememberMe: rememberMe.value
        }

        dispatch(logInTC(requestData));
        email.onChange('')
        email.onBlur(false)
        password.onChange('')
        password.onBlur(false)
        rememberMe.onChange(false)

    }

    const signUpClickHandler = () => {
        dispatch(setIsValidReg(false))
    }


    if (email.touched || email.value || password.touched || password.value) {
        dispatch(setLoginError(''))
    }


    if (isLoading) {
        return <h1>...loading</h1>
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
                    Login
                </div>
                <form action="">
                    {ErrorRequestMsg && <div>{ErrorRequestMsg}</div>}


                    <ErrorWindow isEmptyEmailMsg={isEmptyEmailMsg} minLengthEmailMsg={minLengthEmailMsg}
                                 isValidEmailMsg={isValidEmailMsg}/>


                    <SuperInputText onChange={email.onChange} onBlur={() => {
                        email.onBlur(true)
                    }} value={email.value}
                                    label={'Email'}/>

                    <ErrorWindow isEmptyPassMsg={isEmptyPassMsg} minLengthPassMsg={minLengthPassMsg}
                                 maxLengthPassMsg={maxLengthPassMsg}/>


                    <SuperInputText onChange={password.onChange} onBlur={() => {
                        password.onBlur(true)
                    }} value={password.value}
                                    label={'Password'} type={'password'}/>


                    <input value={rememberMe.value} onChange={rememberMe.onChange} type={'checkbox'}/> remember me


                    <NavLink className={cn.linkforgot} to={PATH.RECOVER_PASS}>Forgot password</NavLink>


                    <div><NavLink onClick={signUpClickHandler} className={cn.linkforgot} to={PATH.REGISTRATION}>Sign
                        up</NavLink></div>
                    {/*Если пользователь который только что зарегался решит еще раз зарегаться нам нужно откатить IsValidRec в registration reducer*/}


                    <SuperButton onClick={onClickHandler} disabled={isLoginDisabled}
                                 style={{width: 280, marginTop: 80, marginBottom: 40}}>Login</SuperButton>


                </form>
            </div>
        </div>
    );
}

export default Login;

