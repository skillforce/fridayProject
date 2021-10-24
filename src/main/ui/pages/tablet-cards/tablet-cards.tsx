import React, {SyntheticEvent, useEffect, useState} from 'react';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import s from './tablet-cards.module.css';
import user from '../../../../assets/img/user.png'
import {useDispatch, useSelector} from 'react-redux';
import {
    getCarsPack,
    InitialStateTabletType, PostCards, SearchTextType,
    SetMinMaxCardsCurrent, SetSearchedBy, SetSearchText, SetSortStatus,
    SortPackType
} from '../../../bll/redusers/tablet-reducer';
import {AppStoreType} from '../../../bll/store/store';
import {InitialStateLoginType} from '../../../bll/redusers/profile-reducer';
import Paginator from './Paginator/Paginator';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import SuperSelect from '../../common/c5-SuperSelect/SuperSelect';


const TabletCards = () => {


    const profile = useSelector<AppStoreType, InitialStateLoginType>(state => state.profile)
    const {
        _id,
        name,
        avatar
    } = profile.profile

    const tablet = useSelector<AppStoreType, InitialStateTabletType>(state => state.tablet)
    const [rangeValue, setRangeValue] = useState<number[]>([tablet.minCardsCount, tablet.maxCardsCount])
    const [checkBoxValue, setCheckBoxValue] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('');


    const selectParamsOptions:SearchTextType[] = ['By name', 'By creator']
    const [selectedParams, setOptionParams] = useState<SearchTextType>(selectParamsOptions[0]);


    const {cardPacks, currentPage, cardPacksTotalCount, pageCount, minCardsCount, maxCardsCount, sortStatus} = tablet

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarsPack(checkBoxValue))
    }, [currentPage, minCardsCount, maxCardsCount, sortStatus, checkBoxValue])


    const onChangeRangeHandler = (newRangeValue: number[]) => {
        setRangeValue(newRangeValue)
    }
    const onClickSearchBtnHandler = (newMinMaxCurrent?: number[],sortBy?:SearchTextType) => {
        if(newMinMaxCurrent) {
            dispatch(SetMinMaxCardsCurrent(newMinMaxCurrent))
        }else if(sortBy){
            dispatch(SetSearchedBy(sortBy))
            dispatch(SetSearchText(search))
            dispatch(getCarsPack(checkBoxValue))
        }
    }

    const onSortBtnHandler = (newStatus: SortPackType) => {
        dispatch(SetSortStatus(newStatus))
    }
    const onChangeCheckBoxStatus = () => {
        setCheckBoxValue(!checkBoxValue)
    }
    const onHandlerSearch = (e: SyntheticEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
    };

    const onAddNewCardsClickHandler = () => {
        dispatch(PostCards())
        if (checkBoxValue) {
            onChangeCheckBoxStatus()
        }

    };




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
                        <br/>
                        <br/>
                        <SuperButton onClick={onAddNewCardsClickHandler}>ADD NEW CARDS</SuperButton>
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
                    <div style={{display: 'inline-block'}}>
                        <input onChange={onChangeCheckBoxStatus} checked={checkBoxValue} type={'checkbox'}/>My cards
                    </div>
                    <div className={s.inp}>
                        <div style={{display:'flex'}}>
                            {selectedParams === 'By name' &&
                            <SuperInputText onChange={onHandlerSearch} value={search} label="Search by name"/>}
                            {selectedParams === 'By creator' &&
                            <SuperInputText onChange={onHandlerSearch} value={search} label="Search by creator"/>}
                            <SuperButton onClick={() => onClickSearchBtnHandler(undefined,selectedParams)}>search</SuperButton>
                        </div>
                        <SuperSelect onChangeOption={setOptionParams} options={selectParamsOptions}/>

                    </div>
                    <table className={s.mainTab}>
                        <thead>
                        <tr>
                            <th>Name
                                <div>
                                    <button className={tablet.sortStatus === '1name' ? s.activeBtn : ''}
                                            onClick={() => onSortBtnHandler('1name')}>/\
                                    </button>
                                    <button className={tablet.sortStatus === '0name' ? s.activeBtn : ''}
                                            onClick={() => onSortBtnHandler('0name')}>\/
                                    </button>
                                </div>
                            </th>

                            <th>Cards
                                <div>
                                    <button className={tablet.sortStatus === '1cardsCount' ? s.activeBtn : ''}
                                            onClick={() => onSortBtnHandler('1cardsCount')}>/\
                                    </button>
                                    <button className={tablet.sortStatus === '0cardsCount' ? s.activeBtn : ''}
                                            onClick={() => onSortBtnHandler('0cardsCount')}>\/
                                    </button>
                                </div>
                            </th>
                            <th>Last Updated
                                <div>
                                    <button className={tablet.sortStatus === '1updated' ? s.activeBtn : ''}
                                            onClick={() => onSortBtnHandler('1updated')}>/\
                                    </button>
                                    <button className={tablet.sortStatus === '0updated' ? s.activeBtn : ''}
                                            onClick={() => onSortBtnHandler('0updated')}>\/
                                    </button>
                                </div></th>
                            <th>Created by</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cardPacks.map(t =>
                            <tr key={t._id}>
                                <td>{t.name}</td>
                                <td>{t.cardsCount}</td>
                                <td>{t.updated ? new Date(t.updated).toLocaleDateString() : ''}</td>
                                <td>{t.user_name}</td>
                                <td style={{display: 'flex'}}><SuperButton>Learn</SuperButton>
                                    {t.user_id === profile.profile._id && <SuperButton>del</SuperButton>}
                                    {t.user_id === profile.profile._id && <SuperButton>update</SuperButton>}
                                </td>
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
