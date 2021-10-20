import s from './Preloader.module.css';
import React from 'react';

const{loader}=s

export const Preloader =()=>{

    return(
        <div>
            <div className={loader}>Loading...</div>
        </div>
    )


}