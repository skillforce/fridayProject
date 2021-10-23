import React, {useEffect, useState} from 'react';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import s from './tablet-cards.module.css';
import user from '../../../../assets/img/user.png'
import {useDispatch, useSelector} from 'react-redux';
import {getCarsPack, InitialStateTabletType} from '../../../bll/redusers/tablet-reducer';
import {AppStoreType} from '../../../bll/store/store';
import {InitialStateLoginType} from '../../../bll/redusers/profile-reducer';



const TabletCards = () => {


    const profile = useSelector<AppStoreType, InitialStateLoginType>(state => state.profile)
    const {
        _id,
        name,
        avatar
    } = profile.profile

    const tablet = useSelector<AppStoreType,InitialStateTabletType>(state=>state.tablet)


    const{cardPacks}=tablet



    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCarsPack())
        console.log(cardPacks)
    },[])





    return (
        <>
            <div className={s.profile}>
                <div className={s.user}>
                    <div className={s.user_card}>
                        <div className={s.logo}>
                            <img src={avatar? avatar : user} alt=""/>
                        </div>
                        <div className={s.name}>
                            {name}
                        </div>
                        <div className={s.about}>
                            {_id}
                        </div>
                    </div>

                    <div className={s.polz}>
                        <div className={s.polztit}>Number of cards</div>
                        <br/>
                        <br/>
                        тут добавишь ренж :)
                    </div>
                </div>
                <div className={s.table}>
                    <div className={s.tit}>
                        Pack list for {name}
                    </div>
                    <div className={s.inp}>

                        <SuperInputText label="Search"/>

                    </div>
                    <table className={s.mainTab}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Cards</th>
                            <th>Last Updated</th>
                            <th>Created by</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cardPacks.map(t=>
                        <tr key={t._id}>
                            <td>{t.name}</td>
                            <td>{t.cardsCount}</td>
                            <td>{t.updated}</td>
                            <td>{t.user_name}</td>
                            <td><SuperButton>Learn</SuperButton></td>
                        </tr>)}
                        </tbody>

                    </table>

                    тут добавишь кнопочки :)
                </div>
            </div>
        </>
    );
}

export default TabletCards;
