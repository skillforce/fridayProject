import React from 'react';
import {PATH} from '../routes/Routes';
import {NavLink} from 'react-router-dom'
import s from './header.module.css';
import cn from './header.module.css';
import SuperButton from '../common/c2-SuperButton/SuperButton';
import {FaReact} from 'react-icons/fa';
import {FaRegUser} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../bll/store/store';
import {logOutTC} from '../../bll/redusers/login-reducer';

const {header_tittle, header_nav, header_nav_active} = s;

const Header = () => {

    const dispatch=useDispatch();

    const isLogin = useSelector<AppStoreType, boolean>(state => state.login.logIn);




     const logOutClickHandler=()=>{
         dispatch(logOutTC())
     }

    return (
        <div className={cn.over}>
            <div className={cn.header}>
                <div><FaReact className={cn.logo}/></div>
                <div className={header_tittle}>
                    <NavLink to={PATH.ENTER_NEW_PASS} className={header_nav} activeClassName={header_nav_active}>enter
                        new pass</NavLink>
                    <NavLink to={PATH.ERROR_404} className={header_nav}
                             activeClassName={header_nav_active}>error404</NavLink>
                    <NavLink to={PATH.LOGIN} className={header_nav} activeClassName={header_nav_active}>login</NavLink>
                    <NavLink to={PATH.PROFILE} className={header_nav}
                             activeClassName={header_nav_active}> <FaRegUser className={cn.menuIcon}/> Profile</NavLink>
                    <NavLink to={PATH.RECOVER_PASS} className={header_nav} activeClassName={header_nav_active}>recover
                        pass</NavLink>
                    <NavLink to={PATH.REGISTRATION} className={header_nav}
                             activeClassName={header_nav_active}>registration</NavLink>
                    <NavLink to={PATH.TEST} className={header_nav} activeClassName={header_nav_active}>test</NavLink>
                </div>
                {isLogin && <div><SuperButton onClick={logOutClickHandler}>Logout</SuperButton></div>}
            </div>
        </div>
    );
}

export default Header;
