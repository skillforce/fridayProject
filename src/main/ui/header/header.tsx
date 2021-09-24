import React from 'react';
import {PATH} from '../routes/Routes';
import {NavLink} from 'react-router-dom'
import s from './header.module.css';

const{header_tittle,header_nav,header_nav_active}=s;

const Header = () => {
    return (
        <div className={header_tittle}>
            <NavLink to={PATH.ENTER_NEW_PASS} className={header_nav} activeClassName={header_nav_active}>enter new pass</NavLink>
            <NavLink to={PATH.ERROR_404} className={header_nav} activeClassName={header_nav_active}>error404</NavLink>
            <NavLink to={PATH.LOGIN} className={header_nav} activeClassName={header_nav_active}>login</NavLink>
            <NavLink to={PATH.PROFILE} className={header_nav} activeClassName={header_nav_active}>profile</NavLink>
            <NavLink to={PATH.RECOVER_PASS} className={header_nav} activeClassName={header_nav_active}>recover pass</NavLink>
            <NavLink to={PATH.REGISTRATION} className={header_nav} activeClassName={header_nav_active}>registration</NavLink>
            <NavLink to={PATH.TEST} className={header_nav} activeClassName={header_nav_active}>test</NavLink>

        </div>
    );
}

export default Header;
