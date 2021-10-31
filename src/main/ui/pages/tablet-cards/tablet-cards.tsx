import React, {SyntheticEvent, useEffect, useState} from 'react';
import s from './tablet-cards.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {
    DeleteCards,
    getCarsPack,
    InitialStateTabletType,
    PostCards,
    SearchCorrectCards,
    SearchTextType,
    SetCheckBoxValue,
    SetMinMaxCardsCurrent,
    SetSearchCardsArr,
    SetSearchedBy,
    SetSearchEmpty,
    SetSearchMode,
    SetSearchText,
    SetSortStatus,
    SortPackType,
    updateCards
} from '../../../bll/redusers/tablet-reducer';
import {AppStoreType} from '../../../bll/store/store';
import {InitialStateLoginType} from '../../../bll/redusers/profile-reducer';
import Paginator from '../../common/Paginator/Paginator';
import 'rc-slider/assets/index.css';
import {Preloader} from '../../common/Preloader/Preloader';
import {ResponsePage} from '../../common/ResponsePage/ResponsePage';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../routes/Routes';
import Login, {useInput} from '../login/login';
import {SortBtn} from '../../common/sortBtn/sortBtn';
import {CardOnly} from './CardOnly/CardOnly';
import {CardsDeckProfile} from './CardsDeckProfile/CardsDeckProfile';
import {SearchBlock} from '../../common/SearchBlock/SearchBlock';
import {Modal} from '../../common/Modal/Modal';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';


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


    const [activeModalAddDeck, setActiveModalAddDeck] = useState<boolean>(false)
    const [activeModalUpdateDeck, setActiveModalUpdateDeck] = useState<boolean>(false)
    const [activeModalDeleteDeck, setActiveModalDeleteDeck] = useState<boolean>(false)
    const [cardIdInModal, setCardIdInModal] = useState<string>('')
    const nameInModal = useInput('', {isEmpty: true, minLength: 1, maxLength: 25});
    const [checkBoxInModal, setCheckBoxInModal] = useState<boolean>(false)

    const onChangeCheckBoxInModal = (newStatus: boolean) => {
        setCheckBoxInModal(newStatus)

    }


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


    const onClickUpdateHandler = () => {

        dispatch(updateCards(cardIdInModal, nameInModal.value))
        setActiveModalUpdateDeck(false)
        nameInModal.onChange('')
        nameInModal.onBlur(false)
        setCardIdInModal('')

    }


    const onDeleteCardsHandler = () => {
        dispatch(DeleteCards(cardIdInModal))
        setCardIdInModal('')
        setActiveModalDeleteDeck(false)
    }

    const onChangeCheckBoxStatus = () => {
        dispatch(SetCheckBoxValue(!checkBoxValue))
    }
    const onHandlerSearch = (e: SyntheticEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
    };

    const onAddNewCardsClickHandler = () => {

        const addParams = {
            name: nameInModal.value,
            private: checkBoxInModal
        }

        dispatch(PostCards(addParams))
        setActiveModalAddDeck(false)
        nameInModal.onChange('')
        nameInModal.onBlur(false)
        onChangeCheckBoxInModal(false)
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
            <Modal active={activeModalAddDeck} setActive={setActiveModalAddDeck}>
                <div className={s.addDeckModal}>
                    <div>Deck info:</div>
                    <div><SuperInputText value={nameInModal.value} onChange={nameInModal.onChange} onBlur={() => {
                        nameInModal.onBlur(true)
                    }} label={'uniq name of Deck'}/></div>
                    <div>private:<input checked={checkBoxInModal}
                                        onChange={() => onChangeCheckBoxInModal(!checkBoxInModal)} type={'checkbox'}/>
                    </div>
                    <div><SuperButton onClick={onAddNewCardsClickHandler}>ADD NEW DECK</SuperButton></div>
                </div>
            </Modal>
            <Modal active={activeModalUpdateDeck} setActive={setActiveModalUpdateDeck}>
                <div className={s.addDeckModal}>
                    <div>Rename deck:</div>
                    <div><SuperInputText value={nameInModal.value} onChange={nameInModal.onChange} onBlur={() => {
                        nameInModal.onBlur(true)
                    }} label={'New name for deck'}/></div>
                    <div><SuperButton onClick={onClickUpdateHandler}>Rename</SuperButton></div>
                </div>
            </Modal>
            <Modal active={activeModalDeleteDeck} setActive={setActiveModalDeleteDeck}>
                <div className={s.addDeckModal}>
                    <div>Are you sure?</div>
                    <div className={s.DelDeckModal}>
                        <div><SuperButton onClick={onDeleteCardsHandler}>OK</SuperButton></div>
                        <div><SuperButton onClick={() => setActiveModalDeleteDeck(false)}>Cancel</SuperButton></div>
                    </div>
                </div>
            </Modal>


            <div className={s.profile}>
                <CardsDeckProfile setActiveModalAddDeck={setActiveModalAddDeck}
                                  cardPacksTotalCount={cardPacksTotalCount}
                                  avatar={avatar} name={name} _id={_id}
                                  rangeValue={rangeValue} onClickSearchBtnHandler={onClickSearchBtnHandler}
                                  onChangeRangeHandler={onChangeRangeHandler}/>
                <div className={s.table}>
                    <div className={s.tit}>
                        Pack list for {name}
                    </div>
                    <div style={{display: 'inline-block'}}>
                        <input onChange={onChangeCheckBoxStatus} checked={checkBoxValue} type={'checkbox'}/>My cards
                    </div>
                    <SearchBlock searchProperty={selectParamsOptions} selectedParams={selectedParams}
                                 onHandlerSearch={onHandlerSearch}
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
                        <CardOnly setActiveModalDeleteDeck={setActiveModalDeleteDeck}
                                  setCardIdInModal={setCardIdInModal}
                                  setActiveModalUpdateDeck={setActiveModalUpdateDeck} searchEmpty={searchEmpty}
                                  cardPacks={cardPacks} searchCardsArr={searchCardsArr}
                                  pageForSearchMode={pageForSearchMode} profileId={profile.profile._id}
                                  setNameDeck={nameInModal.onChange}/>
                    </table>
                </div>
            </div>
            <Paginator pageForSearchMode={pageForSearchMode} searchMode={searchMode}
                       totalItemsCount={cardPacksTotalCount} currentPage={currentPage} pageSize={pageCount}/>

        </>
    )
        ;
}

export default TabletCards;
