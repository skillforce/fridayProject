import s from './ResponsePage.module.css';
import React from 'react';
import mail from './mail.png';
import error from './error.png';
import success from './success.png';

import {PATH} from '../../routes/Routes';
import {NavLink} from 'react-router-dom';

const{autorization,form,hTit,tit,imgMailSent,infText,linkforgot}=s;



type ResponsePagePropsType ={
    email?:string
    typeOfPage:'sent'|'error'|'success'|'cardsError'
    errorText?:string
}



export const ResponsePage =(props:ResponsePagePropsType)=>{
    const{email,typeOfPage,errorText}=props;
    return (
         <div className={autorization}>
             {typeOfPage==='sent'&& <div className={form}>
                <div className={hTit}>
                    It-incubator
                </div>
                <div className={tit}>
                    Check Email
                </div>
                <div className={imgMailSent}>
                <img src={mail} alt="mailSent"/>
            </div>
                <div className={infText}>
                    We've sent an Email with instruction to {email}
                </div>
                 <NavLink className={linkforgot} to={PATH.LOGIN}>Sign in</NavLink>
            </div>}
             {typeOfPage==='error'&& <div className={form}>
                 <div className={hTit}>
                     It-incubator
                 </div>
                 <div className={tit}>
                     Some Error
                 </div>
                 <div className={imgMailSent}>
                     <img src={error} alt="error"/>
                 </div>
                 <div className={infText}>
                     Happen some error, await a few seconds...
                 </div>
             </div>}
             {typeOfPage==='success'&& <div className={form}>
                 <div className={hTit}>
                     It-incubator
                 </div>
                 <div className={tit}>
                     Success!
                 </div>
                 <div className={imgMailSent}>
                     <img src={success} alt="success"/>
                 </div>
             </div>}
             {typeOfPage==='cardsError'&& <div className={form}>
                 <div className={hTit}>
                     It-incubator
                 </div>
                 <div className={tit} style={{color:'red'}}>
                     Some Error
                 </div>
                 <div className={infText}>
                     Happen some error, await a few seconds...
                 </div>
             </div>}
        </div>)
}


