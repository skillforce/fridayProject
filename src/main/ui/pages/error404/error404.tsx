import React from 'react';
import errImg from './404ErrImg/notfound.gif';
import s from './error404.module.css';

const{err404}=s;

const Error404 = () => {
    return (
        <div className={err404}>
            <img src={errImg} alt="ErrorImg"/>
        </div>
    );
}

export default Error404;
