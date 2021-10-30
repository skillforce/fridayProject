import s from './CardsDeckProfile.module.css';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../../routes/Routes';
import SuperButton from '../../../common/c2-SuperButton/SuperButton';
import {Range} from 'rc-slider';
import React from 'react';
import {SearchTextType} from '../../../../bll/redusers/tablet-reducer';


type CardsDeckProfilePropsType = {
    avatar: string | null
    name: string | null
    _id: string | null
    onAddNewCardsClickHandler: () => void
    rangeValue: number[]
    onClickSearchBtnHandler: (newMinMaxCurrent?: number[], sortBy?: SearchTextType) => void
    onChangeRangeHandler: (newRangeValue: number[]) => void
    cardPacksTotalCount: number | null
    setActiveModal?:(newActiveStatus:boolean)=>void
}

export const CardsDeckProfile = (props: CardsDeckProfilePropsType) => {
    const {user, user_card, logo, name_profile, about, polz, polztit, rangeValues,rangeClass} = s;
    const {
        avatar,
        name,
        _id,
        onAddNewCardsClickHandler,
        rangeValue,
        onClickSearchBtnHandler,
        onChangeRangeHandler,
        cardPacksTotalCount,
        setActiveModal
    } = props;
    return (
        <div className={user}>
            <div className={user_card}>
                <div className={logo}>
                    <NavLink to={PATH.PROFILE}><img src={avatar ? avatar : ''} alt=""/></NavLink>
                </div>
                <div className={name_profile}>
                    {name}
                </div>
                <div className={about}>
                    {_id}
                </div>
                {/*<SuperButton onClick={onAddNewCardsClickHandler}>ADD NEW DECK</SuperButton>*/}
                {setActiveModal && <SuperButton onClick={()=>setActiveModal(true)}>ADD NEW DECK</SuperButton>}
            </div>

            <div className={polz}>
                <div className={polztit}>
                    Current of cards:{cardPacksTotalCount}
                </div>
                <div className={rangeValues}>
                    <div>min:{rangeValue[0]}</div>
                    <div>max:{rangeValue[1]}</div>
                </div>
                <div className={rangeClass}>
                <Range min={0} max={200} defaultValue={rangeValue} value={rangeValue}
                       onChange={onChangeRangeHandler}/>
                </div>
                <SuperButton onClick={() => onClickSearchBtnHandler(rangeValue)}>search</SuperButton>
            </div>
        </div>
    )
}