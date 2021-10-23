import React, {useEffect, useState} from 'react';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import s from './tablet-cards.module.css';
import user from '../../../../assets/img/user.png'
import {useDispatch, useSelector} from 'react-redux';
import {
    getCarsPack,
    InitialStateTabletType,
    SetMinMaxCardsCurrent, SetSortStatus,
    SortPackType
} from '../../../bll/redusers/tablet-reducer';
import {AppStoreType} from '../../../bll/store/store';
import {InitialStateLoginType} from '../../../bll/redusers/profile-reducer';
import Paginator from './Paginator/Paginator';
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';


const TabletCards = () => {


    const profile = useSelector<AppStoreType, InitialStateLoginType>(state => state.profile)
    const {
        _id,
        name,
        avatar
    } = profile.profile

    const tablet = useSelector<AppStoreType, InitialStateTabletType>(state => state.tablet)


    const {cardPacks, currentPage, cardPacksTotalCount, pageCount, minCardsCount, maxCardsCount,sortStatus} = tablet

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarsPack())
    }, [currentPage, minCardsCount, maxCardsCount,sortStatus])


    const [rangeValue, setRangeValue] = useState<number[]>([tablet.minCardsCount, tablet.maxCardsCount])


    const onChangeRangeHandler = (newRangeValue: number[]) => {
        setRangeValue(newRangeValue)
    }
    const onClickSearchBtnHandler = (newMinMaxCurrent: number[]) => {
        dispatch(SetMinMaxCardsCurrent(newMinMaxCurrent))
    }

    const onSortBtnHandler=(newStatus:SortPackType)=>{
        dispatch(SetSortStatus(newStatus))
    }




    return (
        <>
            <div className={s.profile}>
                <div className={s.user}>
                    <div className={s.user_card}>
                        <div className={s.logo}>
                            <img src={avatar ? avatar : user} alt=""/>
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
                        Current of cards
                        <br/>
                        <br/>
                        <div className={s.rangeValues}>
                            <div>min:{rangeValue[0]}</div>
                            <div>max:{rangeValue[1]}</div>
                        </div>
                        <Range min={0} max={200} defaultValue={rangeValue} value={rangeValue}
                               onChange={onChangeRangeHandler}/>
                        <br/>
                        <br/>
                        <SuperButton onClick={() => onClickSearchBtnHandler(rangeValue)}>search</SuperButton>
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
                            <th>Cards <div>
                                <button onClick={()=>onSortBtnHandler('1cardsCount')}>/\</button>
                                <button onClick={()=>onSortBtnHandler('0cardsCount')}>\/</button>
                            </div>
                            </th>
                            <th>Last Updated</th>
                            <th>Created by</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cardPacks.map(t =>
                            <tr key={t._id}>
                                <td>{t.name}</td>
                                <td>{t.cardsCount}</td>
                                <td>{t.updated}</td>
                                <td>{t.user_name}</td>
                                <td><SuperButton>Learn</SuperButton></td>
                            </tr>)}
                        </tbody>
                    </table>

                </div>

            </div>
            <Paginator totalItemsCount={cardPacksTotalCount} currentPage={currentPage} pageSize={pageCount}/>
        </>
    );
}

export default TabletCards;
