import React, {SyntheticEvent, useEffect, useState} from 'react';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import s from './card.module.css';
import user from '../../../../assets/img/user.png'
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../bll/store/store';
import {InitialStateLoginType} from '../../../bll/redusers/profile-reducer';
import 'rc-slider/assets/index.css';
import {NavLink, Redirect, useParams} from 'react-router-dom';
import {PATH} from '../../routes/Routes';
import Paginator from '../tablet-cards/Paginator/Paginator';
import {
    AddCard, DeleteCard,
    getCard,
    InitialStateCardType,
    OneCardsType,
    searchCard,
    SearchCardTextType,
    SetGradeValue, SetPageCount,
    SetSearchCardArr,
    SetSearchCardEmpty,
    SetSearchCardMode,
    SetSearchCardText,
    SetSearchedCardBy,
    SetSortCardStatus,
    sortCardsStatusType, UpdateCard
} from '../../../bll/redusers/card-reducer';
import {Preloader} from '../../common/Preloader/Preloader';
import {Range} from 'rc-slider';
import SuperSelect from '../../common/c5-SuperSelect/SuperSelect';
import Login from '../login/login';
import {ResponsePage} from '../../common/ResponsePage/ResponsePage';


export const Card = () => {

    const dispatch = useDispatch();
    const {token} = useParams<{ token: string }>();
    const tabletInfo = useSelector<AppStoreType, InitialStateCardType>(state => state.card)
    const AllCards = useSelector<AppStoreType, OneCardsType[]>(state => state.card.cards)
    const profile = useSelector<AppStoreType, InitialStateLoginType>(state => state.profile)
    const [gradeCardValue, setGradeCardValue] = useState<number[]>([tabletInfo.gradeValue[0], tabletInfo.gradeValue[1]])
    const selectParamsCardOptions: SearchCardTextType[] = ['By answer', 'By question']
    const [selectedCardParams, setSelectedCardParams] = useState<SearchCardTextType>(selectParamsCardOptions[0]);
    const [search, setSearch] = useState<string>('');
    const isLogin = useSelector<AppStoreType, boolean>(state => state.login.logIn);

    const {
        loadingStatusCard,
        packUserId,
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

    const onAddNewCardHandler = (cardsPack_id: string) => {
        dispatch(AddCard({cardsPack_id}))

    };
    const onDeleteCardHandler = (cardId: string, cardsPack_id: string) => {
        dispatch(DeleteCard(cardId, cardsPack_id))

    };
    const onUpdateCardHandler = (_id: string, cardsPack_id: string) => {
        dispatch(UpdateCard({_id, question: 'blablabla'}, cardsPack_id,))

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
                        <SuperButton disabled={!(profile.profile._id === tabletInfo.packUserId)} onClick={() => {
                            onAddNewCardHandler(token)
                        }}>ADD NEW CARD</SuperButton>
                    </div>

                    <div className={s.polz}>
                        <div className={s.polztit}>Creator ID:</div>
                        <br/>
                        {packUserId}
                        <br/>
                        <br/>
                        <br/>
                        Current of cards: {cardsTotalCount}
                        <br/>
                        <br/>
                        <div className={s.rangeValues}>
                            <div>min:{gradeCardValue[0]}</div>
                            <div>max:{gradeCardValue[1]}</div>
                        </div>
                        <Range step={0.1} min={0} max={5} defaultValue={gradeCardValue} value={gradeCardValue}
                               onChange={onChangeGradeHandler}/>
                        <br/>
                        <br/>
                        {!searchCardMode &&
                        <SuperButton onClick={() => onClickSearchCardHandler(gradeCardValue)}>search</SuperButton>}
                        {searchCardMode && <SuperButton
                            onClick={() => onClickSearchModeCardHandler(gradeCardValue, selectedCardParams)}>search</SuperButton>}
                    </div>
                </div>
                <div className={s.table}>
                    <div className={s.tit}>
                        Card list for {name}
                    </div>
                    <br/>
                    <br/>
                    <div className={s.inp}>
                        <div style={{display: 'flex'}}>
                            {selectedCardParams === 'By answer' &&
                            <SuperInputText onChange={onHandlerCardSearch} value={search} label="Search by answer"/>}
                            {selectedCardParams === 'By question' &&
                            <SuperInputText onChange={onHandlerCardSearch} value={search} label="Search by question"/>}
                            <SuperButton disabled={search === ''}
                                         onClick={() => onClickSearchCardHandler(undefined, selectedCardParams)}>search</SuperButton>
                            {searchCardMode && <SuperButton onClick={onAllCardPagesHandler}>go to all</SuperButton>}
                        </div>
                        <SuperSelect onChangeOption={setSelectedCardParams} options={selectParamsCardOptions}/>

                    </div>
                    <table className={s.mainTab}>
                        <thead>
                        <tr>
                            <th>Question
                                <div>
                                    <button className={tabletInfo.sortCards === '1question' ? s.activeBtn : ''}
                                            onClick={() => onSortBtnHandler('1question')}>/\
                                    </button>
                                    <button className={tabletInfo.sortCards === '0question' ? s.activeBtn : ''}
                                            onClick={() => onSortBtnHandler('0question')}>\/
                                    </button>
                                </div>
                            </th>

                            <th>Answer
                                <div>
                                    <button className={tabletInfo.sortCards === '1answer' ? s.activeBtn : ''}
                                            onClick={() => onSortBtnHandler('1answer')}>/\
                                    </button>
                                    <button className={tabletInfo.sortCards === '0answer' ? s.activeBtn : ''}
                                            onClick={() => onSortBtnHandler('0answer')}>\/
                                    </button>
                                </div>
                            </th>
                            <th>Grade
                                <div>
                                    <button className={tabletInfo.sortCards === '1grade' ? s.activeBtn : ''}
                                            onClick={() => onSortBtnHandler('1grade')}>/\
                                    </button>
                                    <button className={tabletInfo.sortCards === '0grade' ? s.activeBtn : ''}
                                            onClick={() => onSortBtnHandler('0grade')}>\/
                                    </button>
                                </div>
                            </th>
                            <th>Updated
                                <div>
                                    <button className={tabletInfo.sortCards === '1updated' ? s.activeBtn : ''}
                                            onClick={() => onSortBtnHandler('1updated')}>/\
                                    </button>
                                    <button className={tabletInfo.sortCards === '0updated' ? s.activeBtn : ''}
                                            onClick={() => onSortBtnHandler('0updated')}>\/
                                    </button>
                                </div></th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {searchCardEmpty &&
                        <div style={{margin: '60px', fontSize: '50px', color: 'red'}}>{searchCardEmpty}</div>}
                        {AllCards && AllCards.map(t =>
                            <tr key={t.cardsPack_id}>
                                <td>{t.question}</td>
                                <td>{t.answer}</td>
                                <td>{t.grade.toFixed(1)}</td>
                                <td>{new Date(t.updated).toLocaleDateString()}</td>
                                <td><SuperButton onClick={() => {
                                    onDeleteCardHandler(t._id, t.cardsPack_id)
                                }}>DELETE</SuperButton>
                                    <SuperButton onClick={() => {
                                        onUpdateCardHandler(t._id, t.cardsPack_id)
                                    }}>UPDATE</SuperButton></td>
                            </tr>)}
                        {searchCardArr && searchCardArr[pageForSearchCardMode].map(t =>
                            <tr key={t.cardsPack_id}>
                                <td>{t.question}</td>
                                <td>{t.answer}</td>
                                <td>{t.grade.toFixed(1)}</td>
                                <td>{new Date(t.updated).toLocaleDateString()}</td>
                                <td><SuperButton onClick={() => {
                                    onDeleteCardHandler(t._id, t.cardsPack_id)
                                }}>DELETE</SuperButton>
                                    <SuperButton onClick={() => {
                                        onUpdateCardHandler(t._id, t.cardsPack_id)
                                    }}>UPDATE</SuperButton></td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
            <Paginator cardType={true} pageForSearchMode={pageForSearchCardMode} searchMode={searchCardMode}
                       totalItemsCount={cardsTotalCount} currentPage={page} pageSize={4}/>
        </>
    )
        ;
}

export default Card;
