import React, {SyntheticEvent, useEffect, useState} from 'react';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import s from './card.module.css';
import user from '../../../../assets/img/user.png'
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../bll/store/store';
import {InitialStateLoginType} from '../../../bll/redusers/profile-reducer';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import SuperSelect from '../../common/c5-SuperSelect/SuperSelect';
import {NavLink, useParams} from 'react-router-dom';
import {PATH} from '../../routes/Routes';
import Paginator from '../tablet-cards/Paginator/Paginator';
import {getCard, InitialStateCardType} from '../../../bll/redusers/card-reducer';
import card from '../../../../../../backFriday/back/src/cnb-2-features/f-2-cards/c-2-models/card';


export const Card = () => {

    const dispatch = useDispatch();
    const {token} = useParams<{ token: string }>();
    const AllCards = useSelector<AppStoreType, InitialStateCardType>(state => state.card)
    const profile = useSelector<AppStoreType, InitialStateLoginType>(state => state.profile)
    const {
        cards,
    } = AllCards


    const {
        _id,
        name,
        avatar
    } = profile.profile

    useEffect(() => {
        dispatch(getCard(token))
    }, [])


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
                        <div className={s.polztit}>ID of cards:</div>
                        <br/>
                        <br/>
                        Current of cards
                        <br/>
                        <br/>
                        <div className={s.rangeValues}>
                            {/*<div>min:{rangeValue[0]}</div>*/}
                            {/*<div>max:{rangeValue[1]}</div>*/}
                        </div>
                        {/*<Range min={0} max={200} defaultValue={rangeValue} value={rangeValue}*/}
                        {/*       onChange={onChangeRangeHandler}/>*/}
                        {/*<br/>*/}
                        {/*<br/>*/}
                        {/*<SuperButton onClick={() => onClickSearchBtnHandler(rangeValue)}>search</SuperButton>*/}
                    </div>
                </div>
                <div className={s.table}>
                    <div className={s.tit}>
                        Card list for {name}
                    </div>
                    {/*<div className={s.inp}>*/}
                    {/*    <div style={{display: 'flex'}}>*/}
                    {/*        {selectedParams === 'By name' &&*/}
                    {/*        <SuperInputText onChange={onHandlerSearch} value={search} label="Search by name"/>}*/}
                    {/*        {selectedParams === 'By creator' &&*/}
                    {/*        <SuperInputText onChange={onHandlerSearch} value={search} label="Search by creator"/>}*/}
                    {/*        <SuperButton*/}
                    {/*            onClick={() => onClickSearchBtnHandler(undefined, selectedParams)}>search</SuperButton>*/}
                    {/*        {searchMode && <SuperButton onClick={onAllPagesHandler}>go to all</SuperButton>}*/}
                    {/*    </div>*/}
                    {/*    <SuperSelect onChangeOption={setOptionParams} options={selectParamsOptions}/>*/}

                    {/*</div>*/}
                    <table className={s.mainTab}>
                        <thead>
                        <tr>
                            <th>Question
                                {/*<div>*/}
                                {/*    <button className={tablet.sortStatus === '1name' ? s.activeBtn : ''}*/}
                                {/*            onClick={() => onSortBtnHandler('1name')}>/\*/}
                                {/*    </button>*/}
                                {/*    <button className={tablet.sortStatus === '0name' ? s.activeBtn : ''}*/}
                                {/*            onClick={() => onSortBtnHandler('0name')}>\/*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </th>

                            <th>Answer
                                {/*<div>*/}
                                {/*    <button className={tablet.sortStatus === '1cardsCount' ? s.activeBtn : ''}*/}
                                {/*            onClick={() => onSortBtnHandler('1cardsCount')}>/\*/}
                                {/*    </button>*/}
                                {/*    <button className={tablet.sortStatus === '0cardsCount' ? s.activeBtn : ''}*/}
                                {/*            onClick={() => onSortBtnHandler('0cardsCount')}>\/*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </th>
                            <th>Grade
                                {/*<div>*/}
                                {/*    <button className={tablet.sortStatus === '1updated' ? s.activeBtn : ''}*/}
                                {/*            onClick={() => onSortBtnHandler('1updated')}>/\*/}
                                {/*    </button>*/}
                                {/*    <button className={tablet.sortStatus === '0updated' ? s.activeBtn : ''}*/}
                                {/*            onClick={() => onSortBtnHandler('0updated')}>\/*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </th>
                            <th>Updated</th>
                            <th>Type</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{searchEmpty &&*/}
                        {/*<div style={{margin: '60px', fontSize: '50px', color: 'red'}}>{searchEmpty}</div>}*/}
                        {cards && cards.map(t =>
                            <tr key={t.cardsPack_id}>
                                <td>{t.question}</td>
                                <td>{t.answer}</td>
                                <td>{t.grade}</td>
                                <td>{new Date(t.updated).toLocaleDateString()}</td>
                                <td>{t.type}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
            {/*<Paginator pageForSearchMode={pageForSearchMode} searchMode={searchMode}*/}
            {/*           totalItemsCount={cardPacksTotalCount} currentPage={currentPage} pageSize={pageCount}/>*/}
        </>
    );
}

export default Card;
