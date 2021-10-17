import React, {ChangeEvent, useEffect, useState} from 'react';
import cn from './registation.module.css';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import {NavLink, Redirect} from 'react-router-dom';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../bll/store/store';
import {PATH} from '../../routes/Routes';
import {setSignUpError, SignUpTC} from '../../../bll/redusers/registration-reducer';


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


const useInput = (initialValue: any, validator: ValidatorType) => {
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


const Registration = () => {

    const email = useInput('', {isEmpty: true, minLength: 3, maxLength: 50, isValidEmail: false});
    const password = useInput('', {isEmpty: true, minLength: 7, maxLength: 20});
    const password1 = useInput('', {isEmpty: true, minLength: 7, maxLength: 20});


    const isEmptyEmailMsg = email.touched && email.isEmpty ?
        <div style={{color: 'red'}}>Input should be stuffed</div> : '';
    const isEmptyPassMsg = password.touched && password.isEmpty ?
        <div style={{color: 'red'}}>Input should be stuffed</div> : '';
    const isEmptyPass1Msg = password1.touched && password1.isEmpty ?
        <div style={{color: 'red'}}>Input should be stuffed</div> : '';
    //проверка на пустоту

    const minLengthEmailMsg = email.touched && email.minLengthError ?
        <div style={{color: 'red'}}>Minimal length of email should be more than 3 symbols</div> : '';
    const minLengthPassMsg = password.touched && password.minLengthError ?
        <div style={{color: 'red'}}>Minimal length of password should be more than 8 symbols</div> : '';
    const minLengthPass1Msg = password1.touched && password1.minLengthError ?
        <div style={{color: 'red'}}>Minimal length of password should be more than 8 symbols</div> : '';
    // проверка на минимальную длинну

    const isValidEmailMsg = email.touched && email.isValidEmailError ?
        <div style={{color: 'red'}}>Invalid email</div> : '';
    const maxLengthPassMsg = password.touched && password.maxLengthError ?
        <div style={{color: 'red'}}>Maximal length of password should be low than 20 symbols</div> : '';
    const maxLengthPass1Msg = password1.touched && password1.maxLengthError ?
        <div style={{color: 'red'}}>Maximal length of password should be low than 20 symbols</div> : '';
    // проверка на валидность имейла и максимальную длинну пароля


    const isLoginDisabled = !email.inputValid || !password.inputValid;
//отключаем кнопку если хоть одна ошибка есть

    const isPasswordCorrectReEnter = password.value !== password1.value && password.touched ?
        <div style={{color: 'red'}}>Entered passwords doesn't match</div> : '';


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
        return <h1>...loading</h1>
    }
    if (isLoading && signUpProgress === 'success') {
        return <h1>OK</h1>
    }
    if (isLoading && signUpProgress === 'error') {
        return <h1>ERROR</h1>
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

                    {isEmptyEmailMsg}
                    {minLengthEmailMsg}
                    {isValidEmailMsg}

                    <SuperInputText onChange={email.onChange} onBlur={() => {
                        email.onBlur(true)
                    }} value={email.value}
                                    label={'Enter your email'}/>


                    {isEmptyPassMsg}
                    {minLengthPassMsg}
                    {maxLengthPassMsg}

                    <SuperInputText onChange={password.onChange} onBlur={() => {
                        password.onBlur(true)
                    }} value={password.value}
                                    label={'Enter your unique password'} type={'password'}/>

                    {isPasswordCorrectReEnter}
                    {isEmptyPass1Msg}
                    {minLengthPass1Msg}
                    {maxLengthPass1Msg}

                    <SuperInputText onChange={password1.onChange} onBlur={() => {
                        password1.onBlur(true)
                    }} value={password1.value}
                                    label={'Repeat your password'} type={'password'}/>


                    <NavLink className={cn.linkforgot} to={'./#/recPassword'}>Sign in</NavLink>
                    <SuperButton onClick={onClickHandler} disabled={isLoginDisabled || !!isPasswordCorrectReEnter}
                                 style={{width: 280, marginTop: 80, marginBottom: 40}}>Sign up</SuperButton>


                </form>
            </div>
        </div>
    );
}

export default Registration;
