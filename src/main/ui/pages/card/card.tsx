import React, {SyntheticEvent, useEffect, useState} from 'react';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import s from './card.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../bll/store/store';
import {InitialStateLoginType} from '../../../bll/redusers/profile-reducer';
import 'rc-slider/assets/index.css';
import {NavLink, Redirect, useParams} from 'react-router-dom';
import {PATH} from '../../routes/Routes';
import Paginator from '../../common/Paginator/Paginator';
import {
    AddCard,
    DeleteCard,
    getCard,
    InitialStateCardType,
    OneCardsType,
    searchCard,
    SearchCardTextType,
    SetGradeValue,
    SetPageCount,
    SetSearchCardArr,
    SetSearchCardEmpty,
    SetSearchCardMode,
    SetSearchCardText,
    SetSearchedCardBy,
    SetSortCardStatus,
    sortCardsStatusType,
    UpdateCard
} from '../../../bll/redusers/card-reducer';
import {Preloader} from '../../common/Preloader/Preloader';

import Login, {useInput} from '../login/login';
import {ResponsePage} from '../../common/ResponsePage/ResponsePage';
import {SortBtn} from '../../common/sortBtn/sortBtn';
import {InitialStateTabletType} from '../../../bll/redusers/tablet-reducer';
import {CardOnlyCard} from './CardOnlyCard/CardOnlyCard';
import {CardProfile} from './CardProfile/CardProfile';
import {SearchBlock} from '../../common/SearchBlock/SearchBlock';
import {Modal} from '../../common/Modal/Modal';
import {newCardDataType, newUpdateCardDataType} from '../../../dal/Api';


export const Card = () => {

    const dispatch = useDispatch();
    const {token} = useParams<{ token: string }>();
    const tabletInfo = useSelector<AppStoreType, InitialStateCardType>(state => state.card)
    const AllCards = useSelector<AppStoreType, OneCardsType[]>(state => state.card.cards)
    const profile = useSelector<AppStoreType, InitialStateLoginType>(state => state.profile)
    const tablet = useSelector<AppStoreType, InitialStateTabletType>(state => state.tablet)
    const [gradeCardValue, setGradeCardValue] = useState<number[]>([tabletInfo.gradeValue[0], tabletInfo.gradeValue[1]])
    const selectParamsCardOptions: SearchCardTextType[] = ['By answer', 'By question']
    const [selectedCardParams, setSelectedCardParams] = useState<SearchCardTextType>(selectParamsCardOptions[0]);
    const [search, setSearch] = useState<string>('');
    const isLogin = useSelector<AppStoreType, boolean>(state => state.login.logIn);

    const {
        loadingStatusCard,
        cardsTotalCount,
        page,
        gradeValue,
        sortCards,
        searchCardMode,
        pageForSearchCardMode,
        searchCardArr,
        searchCardEmpty,
        errorCardText
    } = tabletInfo


    const [activeModalAddCard, setActiveModalAddCard] = useState<boolean>(false)
    const [activeModalDeleteCard, setActiveModalDeleteCard] = useState<boolean>(false)
    const [activeModalUpdateCard, setActiveModalUpdateCard] = useState<boolean>(false)
    const [cardPack_id, setCardPack_id] = useState<string>('')
    const [card_id, setCard_id] = useState<string>('')
    const questionInModal = useInput('', {isEmpty: true, minLength: 1, maxLength: 25});
    const answerInModal = useInput('', {isEmpty: true, minLength: 1, maxLength: 25});
    const gradeInModal = useInput(0, {isEmpty: true, minLength: 1, maxLength: 1});

    const onChangeGradeHandler = (newGradeValue: number[]) => {
        setGradeCardValue(newGradeValue)
    }

    const onClickSearchCardHandler = (newGradeValue: number[] | undefined, sortBy?: SearchCardTextType) => {
        if (newGradeValue) {
            dispatch(SetGradeValue(newGradeValue))
        } else if (sortBy) {
            dispatch(SetSearchedCardBy(sortBy))
            dispatch(SetSearchCardText(search))
            dispatch(searchCard(token))
        }
    }
    const onClickSearchModeCardHandler = (newGradeValue: number[], sortBy: SearchCardTextType) => {
        dispatch(SetGradeValue(newGradeValue))
        dispatch(SetSearchedCardBy(sortBy))
        dispatch(SetSearchCardText(search))
        dispatch(searchCard(token))
    }


    const onSortBtnHandler = (newStatus: sortCardsStatusType) => {
        dispatch(SetSortCardStatus(newStatus))
    }
    const onHandlerCardSearch = (e: SyntheticEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
    };

    const onAddNewCardHandler = () => {
        const data: newCardDataType = {
            cardsPack_id: cardPack_id,
            question: questionInModal.value,
            answer: answerInModal.value,
            grade: gradeInModal.value
        }
        dispatch(AddCard(data))
        setActiveModalAddCard(false)
        questionInModal.onChange('')
        answerInModal.onChange('')
        gradeInModal.onChange('')
        setCardPack_id('')
        setCard_id('')

    };

    const onUpdateCardHandler = () => {
        const data: newUpdateCardDataType = {
            _id: card_id,
            question: questionInModal.value,
            answer: answerInModal.value,
            grade: gradeInModal.value
        }
        dispatch(UpdateCard(data, cardPack_id,))
        setActiveModalUpdateCard(false)
        questionInModal.onChange('')
        answerInModal.onChange('')
        gradeInModal.onChange('')
        setCardPack_id('')
        setCard_id('')

    };


    const onDeleteCardHandler = () => {
        dispatch(DeleteCard(card_id, cardPack_id))
        setActiveModalDeleteCard(false)
        setCardPack_id('')
        setCard_id('')

    };

    const onAllCardPagesHandler = () => {
        dispatch(SetSearchCardEmpty(''))
        dispatch(SetSearchCardMode(false))
        dispatch(SetSearchCardArr(null))
        dispatch(SetSortCardStatus('0updated'))
        dispatch(SetPageCount(4))
        dispatch(getCard(token))
        setSearch('');
    };

    const {
        _id,
        name,
        avatar
    } = profile.profile

    useEffect(() => {
        {
            !searchCardMode && dispatch(getCard(token))
        }
        {
            searchCardMode && dispatch(searchCard(token))
        }

    }, [page, gradeValue, sortCards])


    if (!isLogin) {
        return <Login/>
    }

    if (loadingStatusCard === 'loading') {
        return <Preloader/>
    }

    if (loadingStatusCard === 'error') {
        return <ResponsePage typeOfPage={'cardsError'} errorText={errorCardText}/>
    }

    if (loadingStatusCard === 'redirect') {
        return <Redirect to={PATH.PROFILE}/>
    }

    return (
        <>
            <Modal active={activeModalAddCard} setActive={setActiveModalAddCard}>
                <div className={s.addDeckModal}>
                    <div>Card info:</div>
                    <div><SuperInputText value={questionInModal.value} onChange={questionInModal.onChange}
                                         onBlur={() => {
                                             questionInModal.onBlur(true)
                                         }} label={'Question'}/></div>
                    <div><SuperInputText value={answerInModal.value} onChange={answerInModal.onChange} onBlur={() => {
                        answerInModal.onBlur(true)
                    }} label={'Answer'}/></div>
                    {gradeInModal.value > 5 && <div>Grade should be less than 5</div>}
                    {gradeInModal.value < 0 && <div>Grade should be more than 0</div>}
                    <div><SuperInputText value={gradeInModal.value} onChange={gradeInModal.onChange} onBlur={() => {
                        gradeInModal.onBlur(true)
                    }} label={'Grade'}/></div>
                    <div><SuperButton disabled={gradeInModal.value > 5 || gradeInModal.value < 0}
                                      onClick={onAddNewCardHandler}>ADD NEW CARD</SuperButton></div>
                </div>
            </Modal>

            <Modal active={activeModalUpdateCard} setActive={setActiveModalUpdateCard}>
                <div className={s.addDeckModal}>
                    <div>New card info:</div>
                    <div><SuperInputText value={questionInModal.value} onChange={questionInModal.onChange}
                                         onBlur={() => {
                                             questionInModal.onBlur(true)
                                         }} label={'Question'}/></div>
                    <div><SuperInputText value={answerInModal.value} onChange={answerInModal.onChange} onBlur={() => {
                        answerInModal.onBlur(true)
                    }} label={'Answer'}/></div>
                    {gradeInModal.value > 5 && <div>Grade should be less than 5</div>}
                    {gradeInModal.value < 0 && <div>Grade should be more than 0</div>}
                    <div><SuperInputText value={gradeInModal.value} onChange={gradeInModal.onChange} onBlur={() => {
                        gradeInModal.onBlur(true)
                    }} label={'Grade'}/></div>
                    <div><SuperButton disabled={gradeInModal.value > 5 || gradeInModal.value < 0}
                                      onClick={onUpdateCardHandler}>UPDATE</SuperButton></div>
                </div>
            </Modal>

            <Modal active={activeModalDeleteCard} setActive={setActiveModalDeleteCard}>
                <div className={s.addDeckModal}>
                    <div>Are you sure?</div>
                    <div className={s.DelDeckModal}>
                        <div><SuperButton onClick={onDeleteCardHandler}>OK</SuperButton></div>
                        <div><SuperButton onClick={() => setActiveModalDeleteCard(false)}>Cancel</SuperButton></div>
                    </div>
                </div>
            </Modal>


            <div className={s.profile}>
                <CardProfile setCardPack_id={setCardPack_id} setActiveModalAddCard={setActiveModalAddCard}
                             avatar={avatar} name={name} _id={_id}
                             gradeCardValue={gradeCardValue}
                             onClickSearchModeCardHandler={onClickSearchModeCardHandler}
                             onChangeGradeHandler={onChangeGradeHandler} cardsTotalCount={cardsTotalCount}
                             packUserId={tabletInfo.packUserId} token={token}
                             searchCardMode={searchCardMode} selectedCardParams={selectedCardParams}
                             onClickSearchCardHandler={onClickSearchCardHandler}/>
                <div className={s.table}>
                    <div className={s.tit}>
                        Card list for {name}
                    </div>
                    <br/>
                    <br/>
                    <SearchBlock selectedParams={selectedCardParams} onHandlerSearch={onHandlerCardSearch}
                                 onClickSearchBtnHandler={onClickSearchCardHandler}
                                 search={search} searchMode={searchCardMode} onAllPagesHandler={onAllCardPagesHandler}
                                 selectParamsOptions={selectParamsCardOptions} setOptionParams={setSelectedCardParams}
                                 searchProperty={selectParamsCardOptions}/>
                    <NavLink to={PATH.CARDS_TABLET}><SuperButton onClick={onAllCardPagesHandler}>go to all
                        decks </SuperButton></NavLink>
                    <table className={s.mainTab}>
                        <thead>
                        <tr>
                            <th>Question
                                <SortBtn property={'question'} sortStatus={tabletInfo.sortCards}
                                         onSortBtnHandler={onSortBtnHandler}/>
                            </th>

                            <th>Answer
                                <SortBtn property={'answer'} sortStatus={tabletInfo.sortCards}
                                         onSortBtnHandler={onSortBtnHandler}/>
                            </th>
                            <th>Grade
                                <SortBtn property={'grade'} sortStatus={tabletInfo.sortCards}
                                         onSortBtnHandler={onSortBtnHandler}/>
                            </th>
                            <th>Updated
                                <SortBtn property={'updated'} sortStatus={tabletInfo.sortCards}
                                         onSortBtnHandler={onSortBtnHandler}/></th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <CardOnlyCard
                            setActiveModalDeleteCard={setActiveModalDeleteCard} setCard_id={setCard_id}
                            setCardPack_id={setCardPack_id} setActiveModalUpdateCard={setActiveModalUpdateCard}
                            onChangeQuestion={questionInModal.onChange}
                            onChangeAnswer={answerInModal.onChange} onChangeGrade={gradeInModal.onChange}
                            searchCardEmpty={searchCardEmpty} AllCards={AllCards}
                            searchCardArr={searchCardArr}
                            pageForSearchCardMode={pageForSearchCardMode} profileId={profile.profile._id}/>
                    </table>
                </div>
            </div>
            <Paginator cardType={true} pageForSearchMode={pageForSearchCardMode} searchMode={searchCardMode}
                       totalItemsCount={cardsTotalCount} currentPage={page} pageSize={4}/>
        </>
    );
}

export default Card;
