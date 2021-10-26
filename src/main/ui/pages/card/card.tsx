import React, {SyntheticEvent, useEffect, useState} from 'react';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import s from './card.module.css';
import user from '../../../../assets/img/user.png'
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../bll/store/store';
import {InitialStateLoginType} from '../../../bll/redusers/profile-reducer';
import 'rc-slider/assets/index.css';
import {NavLink, useParams} from 'react-router-dom';
import {PATH} from '../../routes/Routes';
import Paginator from '../tablet-cards/Paginator/Paginator';
import {
    getCard,
    InitialStateCardType,
    OneCardsType, searchCard, SearchCardTextType,
    SetGradeValue, SetSearchCardText, SetSearchedCardBy, SetSortCardStatus,
    sortCardsStatusType
} from '../../../bll/redusers/card-reducer';
import {Preloader} from '../../common/Preloader/Preloader';
import {Range} from 'rc-slider';
import {
    SearchCorrectCards,
    SearchTextType,
    SetMinMaxCardsCurrent,
    SetSearchedBy, SetSearchText,
    SetSortStatus,
    SortPackType
} from '../../../bll/redusers/tablet-reducer';
import SuperSelect from '../../common/c5-SuperSelect/SuperSelect';


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


    const {loadingStatusCard, packUserId, cardsTotalCount, pageCount, page, gradeValue,sortCards,searchCardMode,pageForSearchCardMode,searchCardArr} = tabletInfo




    const onChangeGradeHandler = (newGradeValue: number[]) => {
        setGradeCardValue(newGradeValue)
    }

    const onClickSearchCardHandler = (newGradeValue: number[]|undefined, sortBy?: SearchCardTextType) => {
        if (newGradeValue) {
            dispatch(SetGradeValue(newGradeValue))
        } else if (sortBy) {
            dispatch(SetSearchedCardBy(sortBy))
            dispatch(SetSearchCardText(search))
            dispatch(searchCard(token))
        }
    }


    const onSortBtnHandler = (newStatus: sortCardsStatusType) => {
        dispatch(SetSortCardStatus(newStatus))
    }
    const onHandlerCardSearch = (e: SyntheticEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
    };


    const {
        _id,
        name,
        avatar
    } = profile.profile

    useEffect(() => {
        dispatch(getCard(token))
    }, [page, gradeValue,sortCards])


    if (loadingStatusCard === 'loading') {
        return <Preloader/>
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
                        <SuperButton>ADD NEW QUESTION</SuperButton>
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
                        <SuperButton onClick={() => onClickSearchCardHandler(gradeCardValue)}>search</SuperButton>
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
                            <SuperButton
                                onClick={() => onClickSearchCardHandler(undefined, selectedCardParams)}>search</SuperButton>
                            {/*{searchMode && <SuperButton onClick={onAllPagesHandler}>go to all</SuperButton>}*/}
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
                        </tr>
                        </thead>
                        <tbody>
                        {AllCards && AllCards.map(t =>
                            <tr key={t.cardsPack_id}>
                                <td>{t.question}</td>
                                <td>{t.answer}</td>
                                <td>{t.grade.toFixed(1)}</td>
                                <td>{new Date(t.updated).toLocaleDateString()}</td>
                            </tr>)}
                        {searchCardArr && searchCardArr[pageForSearchCardMode].map(t =>
                            <tr key={t.cardsPack_id}>
                                <td>{t.question}</td>
                                <td>{t.answer}</td>
                                <td>{t.grade.toFixed(1)}</td>
                                <td>{new Date(t.updated).toLocaleDateString()}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
            <Paginator cardType={true} pageForSearchMode={pageForSearchCardMode} searchMode={searchCardMode}
                       totalItemsCount={cardsTotalCount} currentPage={page} pageSize={pageCount}/>
        </>
    )
        ;
}

export default Card;
