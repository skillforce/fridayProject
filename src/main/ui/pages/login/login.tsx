import React from 'react';
import cn from './Login.module.css';
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import {NavLink} from "react-router-dom";
import SuperButton from "../../common/c2-SuperButton/SuperButton";

const Login = () => {
    return (
        <div className={cn.autorization}>
            <div className={cn.form}>
                <div className={cn.hTit}>
                    It-incubator
                </div>
                <div className={cn.tit}>
                    Sign In
                </div>
                <form action="">
                    <SuperInputText label={'Email'}/>
                    <SuperInputText label={'Password'} type={"password"}/>
                    <NavLink className={cn.linkforgot} to={'./#/recPassword'}>Forgot password</NavLink>
                    <SuperButton style={{width: 280, marginTop: 80, marginBottom: 40}}>Login</SuperButton>

                </form>
            </div>
        </div>
    );
}

export default Login;

