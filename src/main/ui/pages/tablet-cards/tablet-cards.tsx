import React, {SyntheticEvent, useEffect, useState} from 'react';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import s from './tablet-cards.module.css';
import user from '../../../../assets/img/user.png'
import {useDispatch, useSelector} from 'react-redux';
import {
    DeleteCards,
    getCarsPack,
    InitialStateTabletType,
    PostCards,
    SearchCorrectCards,
    SearchTextType, SetCheckBoxValue,
    SetMinMaxCardsCurrent,
    SetSearchCardsArr,
    SetSearchedBy,
    SetSearchEmpty,
    SetSearchMode,
    SetSearchText,
    SetSortStatus,
    SortPackType, updateCards
} from '../../../bll/redusers/tablet-reducer';
import {AppStoreType} from '../../../bll/store/store';
import {InitialStateLoginType} from '../../../bll/redusers/profile-reducer';
import Paginator from './Paginator/Paginator';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import SuperSelect from '../../common/c5-SuperSelect/SuperSelect';
import {Preloader} from '../../common/Preloader/Preloader';
import {ResponsePage} from '../../common/ResponsePage/ResponsePage';
import {NavLink, Redirect} from 'react-router-dom';
import {PATH} from '../../routes/Routes';
import Login from '../login/login';


export const TabletCards = () => {

    const isLogin = useSelector<AppStoreType, boolean>(state => state.login.logIn);
    const profile = useSelector<AppStoreType, InitialStateLoginType>(state => state.profile)
    const {
        _id,
        name,
        avatar
    } = profile.profile

    const tablet = useSelector<AppStoreType, InitialStateTabletType>(state => state.tablet)
    const [rangeValue, setRangeValue] = useState<number[]>([tablet.minCardsCount, tablet.maxCardsCount])
    const [search, setSearch] = useState<string>('');


    const selectParamsOptions: SearchTextType[] = ['By name', 'By creator']
    const [selectedParams, setOptionParams] = useState<SearchTextType>(selectParamsOptions[0]);


    const {
        cardPacks,
        currentPage,
        cardPacksTotalCount,
        pageCount,
        minCardsCount,
        maxCardsCount,
        sortStatus,
        searchCardsArr,
        searchMode,
        pageForSearchMode,
        searchEmpty,
        checkBoxValue,
        loadingStatus,
        errorText
    } = tablet

    const dispatch = useDispatch();

    useEffect(() => {
        {
            !searchMode && dispatch(getCarsPack())
        }
        {
            searchMode && dispatch(SearchCorrectCards())
        }
    }, [currentPage, minCardsCount, maxCardsCount, sortStatus, checkBoxValue, isLogin])


    const onChangeRangeHandler = (newRangeValue: number[]) => {
        setRangeValue(newRangeValue)
    }
    const onClickSearchBtnHandler = (newMinMaxCurrent?: number[], sortBy?: SearchTextType) => {
        if (newMinMaxCurrent) {
            dispatch(SetMinMaxCardsCurrent(newMinMaxCurrent))
        } else if (sortBy) {
            dispatch(SetSearchedBy(sortBy))
            dispatch(SetSearchText(search))
            dispatch(SearchCorrectCards())
        }
    }

    const onSortBtnHandler = (newStatus: SortPackType) => {
        dispatch(SetSortStatus(newStatus))
    }
    const onClickUpdateHandler = (cardId: string) => {
        dispatch(updateCards(cardId))
    }

    const onDeleteCardsHandler = (cardId: string) => {
        dispatch(DeleteCards(cardId))
    }

    const onChangeCheckBoxStatus = () => {
        dispatch(SetCheckBoxValue(!checkBoxValue))
    }
    const onHandlerSearch = (e: SyntheticEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
    };

    const onAddNewCardsClickHandler = () => {
        dispatch(PostCards())
    };

    const onAllPagesHandler = () => {
        dispatch(SetSearchEmpty(''))
        dispatch(SetSearchMode(false))
        dispatch(SetSearchCardsArr(null))
        dispatch(SetSortStatus('0updated'))
        dispatch(getCarsPack())
        setSearch('');
    };


    if (!isLogin) {
        return <Login/>
    }

    if (loadingStatus === 'loading') {
        return <Preloader/>
    }

    if (loadingStatus === 'error') {
        return <ResponsePage typeOfPage={'cardsError'} errorText={errorText}/>

    }


    if (loadingStatus === 'redirect') {
        return <Redirect to={PATH.PROFILE}/>
    }


    return (
        <>
            <div className={s.profile}>
                <div className={s.user}>
                    <div className={s.user_card}>
                        <div className={s.logo}>
                            <NavLink to={PATH.PROFILE}><img src={avatar ? avatar : user} alt=""/></NavLink>
                        </div>
                        <div className={s.name}>
                            {name}
                        </div>
                        <div className={s.about}>
                            {_id}
                        </div>
                        <br/>
                        <br/>
                        <SuperButton onClick={onAddNewCardsClickHandler}>ADD NEW DECK</SuperButton>
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
                        <div style={{display: 'flex'}}>
                            {selectedParams === 'By name' &&
                            <SuperInputText onChange={onHandlerSearch} value={search} label="Search by name"/>}
                            {selectedParams === 'By creator' &&
                            <SuperInputText onChange={onHandlerSearch} value={search} label="Search by creator"/>}
                            <SuperButton disabled={search === ''}
                                         onClick={() => onClickSearchBtnHandler(undefined, selectedParams)}>search</SuperButton>
                            {searchMode && <SuperButton onClick={onAllPagesHandler}>go to all</SuperButton>}
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
                        <tbody>{searchEmpty &&
                        <div style={{margin: '60px', fontSize: '50px', color: 'red'}}>{searchEmpty}</div>}
                        {cardPacks && cardPacks.map(t =>
                            <tr key={t._id}>
                                <td>{t.name}</td>
                                <td>{t.cardsCount}</td>
                                <td>{t.updated ? new Date(t.updated).toLocaleDateString() : ''}</td>
                                <td>{t.user_name}</td>
                                <td style={{display: 'flex'}}><NavLink
                                    to={'/card/' + t._id}><SuperButton>Learn</SuperButton></NavLink>
                                    {t.user_id === profile.profile._id &&
                                    <SuperButton onClick={() => onDeleteCardsHandler(t._id)}>del</SuperButton>}
                                    {t.user_id === profile.profile._id &&
                                    <SuperButton onClick={() => onClickUpdateHandler(t._id)}>update</SuperButton>}
                                </td>
                            </tr>)}
                        {searchCardsArr && searchCardsArr[pageForSearchMode].map(t =>
                            <tr key={t._id}>
                                <td>{t.name}</td>
                                <td>{t.cardsCount}</td>
                                <td>{t.updated ? new Date(t.updated).toLocaleDateString() : ''}</td>
                                <td>{t.user_name}</td>
                                <td style={{display: 'flex'}}><SuperButton>Learn</SuperButton>
                                    {t.user_id === profile.profile._id &&
                                    <SuperButton onClick={() => onDeleteCardsHandler(t._id)}>del</SuperButton>}
                                    {t.user_id === profile.profile._id &&
                                    <SuperButton onClick={() => onClickUpdateHandler(t._id)}>update</SuperButton>}
                                </td>
                            </tr>)}</tbody>
                    </table>
                </div>
            </div>
            <Paginator pageForSearchMode={pageForSearchMode} searchMode={searchMode}
                       totalItemsCount={cardPacksTotalCount} currentPage={currentPage} pageSize={pageCount}/>
        </>
    );
}

export default TabletCards;
