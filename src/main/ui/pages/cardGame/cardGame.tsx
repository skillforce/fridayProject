import error from '../../common/ResponsePage/error.png';
import React, {useEffect, useState} from 'react';
import s from './cardGame.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {
    gameInit,
    isInitGameStatusType,
    setIsInitGameStatus,
    setIsShowAnswer,
    setMarkValue
} from '../../../bll/redusers/card-game-reducer';
import {NavLink, Redirect, useParams} from 'react-router-dom';
import {AppStoreType} from '../../../bll/store/store';
import {OneCardsType} from '../../../bll/redusers/card-reducer';
import {Preloader} from '../../common/Preloader/Preloader';
import {PATH} from '../../routes/Routes';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import Login from '../login/login';
import {Rating} from './Raiting/raiting';
import {ResponsePage} from '../../common/ResponsePage/ResponsePage';

const {autorization, hTit, tit, ratingBlock, form, infText} = s


export const CardGame = (props: any) => {
    const {token} = useParams<{ token: string }>();
    const CardToShow = useSelector<AppStoreType, OneCardsType>(state => state.cardGame.showCard)
    const isInitStatus = useSelector<AppStoreType, isInitGameStatusType>(state => state.cardGame.isInitGameStatus)
    const isLogin = useSelector<AppStoreType, boolean>(state => state.login.logIn);
    const markValue = useSelector<AppStoreType, number>(state => state.cardGame.markValue);
    const isShowAnswer = useSelector<AppStoreType, boolean>(state => state.cardGame.isShowAnswer);

    const dispatch = useDispatch()
    const onShowAnswerHandler = (newStatus: boolean) => {
        dispatch(setIsShowAnswer(newStatus))
    }

    useEffect(() => {
        dispatch(gameInit(token))
    }, [])



    const onClickNextHandler = () => {
        dispatch(gameInit(token))
    }

    const onSetValue = (num:number)=>{
        dispatch(setMarkValue(num))
    }


    if (!isLogin) {
        return <Login/>
    }
    if (isInitStatus === 'loading') {
        return <Preloader/>
    }
    if (isInitStatus === 'error') {
        return <ResponsePage typeOfPage={'error'} />
    }

    if (isInitStatus === 'redirect') {
        return <Redirect to={PATH.PROFILE}/>
    }

    return (
        <div className={autorization}>
            <div className={form}>
                <div className={hTit}>
                    Question
                </div>
                <div className={tit}>
                    {CardToShow.question}
                </div>
                {isShowAnswer && <div className={tit}>
                    {CardToShow.answer}
                </div>}
                {isShowAnswer && <div className={infText}>
                    Your mark:
                     <div className={ratingBlock}><Rating setValue={onSetValue} value={markValue} cardId={CardToShow._id} cardPackId={token}/></div>
                </div>}
                <div className={infText}>
                    {!isShowAnswer && <SuperButton onClick={() => onShowAnswerHandler(true)}>show answer</SuperButton>}
                    <SuperButton onClick={onClickNextHandler}>next</SuperButton>
                    <NavLink to={PATH.CARDS_TABLET}><SuperButton>go to another decks</SuperButton></NavLink>
                </div>
            </div>
        </div>
    )


}