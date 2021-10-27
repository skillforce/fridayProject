import React, {SyntheticEvent, useEffect, useState} from 'react';
import s from './tablet-cards.module.css';
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
import 'rc-slider/assets/index.css';
import {Preloader} from '../../common/Preloader/Preloader';
import {ResponsePage} from '../../common/ResponsePage/ResponsePage';
import {NavLink, Redirect} from 'react-router-dom';
import {PATH} from '../../routes/Routes';
import Login from '../login/login';
import {SortBtn} from './sortBtn/sortBtn';
import {CardOnly} from './CardOnly/CardOnly';
import {RangeBlock} from './RangeBlock/RangeBlock';
import {CardsDeckProfile} from './CardsDeckProfile/CardsDeckProfile';


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
                <CardsDeckProfile cardPacksTotalCount={cardPacksTotalCount} avatar={avatar} name={name} _id={_id}
                                  onAddNewCardsClickHandler={onAddNewCardsClickHandler}
                                  rangeValue={rangeValue} onClickSearchBtnHandler={onClickSearchBtnHandler}
                                  onChangeRangeHandler={onChangeRangeHandler}/>
                <div className={s.table}>
                    <div className={s.tit}>
                        Pack list for {name}
                    </div>
                    <div style={{display: 'inline-block'}}>
                        <input onChange={onChangeCheckBoxStatus} checked={checkBoxValue} type={'checkbox'}/>My cards
                    </div>
                    <RangeBlock selectedParams={selectedParams} onHandlerSearch={onHandlerSearch}
                                onClickSearchBtnHandler={onClickSearchBtnHandler} search={search}
                                searchMode={searchMode} onAllPagesHandler={onAllPagesHandler}
                                selectParamsOptions={selectParamsOptions} setOptionParams={setOptionParams}/>
                    <table className={s.mainTab}>
                        <thead>
                        <tr>
                            <th>Name
                                <SortBtn property={'name'} sortStatus={tablet.sortStatus}
                                         onSortBtnHandler={onSortBtnHandler}/>
                            </th>

                            <th>Cards
                                <SortBtn property={'cardsCount'} sortStatus={tablet.sortStatus}
                                         onSortBtnHandler={onSortBtnHandler}/>
                            </th>
                            <th>Last Updated
                                <SortBtn property={'updated'} sortStatus={tablet.sortStatus}
                                         onSortBtnHandler={onSortBtnHandler}/>
                            </th>
                            <th>Created by</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <CardOnly searchEmpty={searchEmpty} cardPacks={cardPacks} searchCardsArr={searchCardsArr}
                                  pageForSearchMode={pageForSearchMode} profileId={profile.profile._id}
                                  onDeleteCardsHandler={onDeleteCardsHandler}
                                  onClickUpdateHandler={onClickUpdateHandler}/>
                    </table>
                </div>
            </div>
            <Paginator pageForSearchMode={pageForSearchMode} searchMode={searchMode}
                       totalItemsCount={cardPacksTotalCount} currentPage={currentPage} pageSize={pageCount}/>
        </>
    );
}

export default TabletCards;
