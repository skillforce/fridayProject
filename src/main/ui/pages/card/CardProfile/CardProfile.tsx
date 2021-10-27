import s from './CardProfile.module.css';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../../routes/Routes';
import SuperButton from '../../../common/c2-SuperButton/SuperButton';
import {Range} from 'rc-slider';
import React from 'react';
import {SearchCardTextType} from '../../../../bll/redusers/card-reducer';
import userPhoto from '../../../../../assets/img/user.png'


type CardsDeckProfilePropsType = {
    avatar: string | null
    name: string | null
    _id: string | null
    onAddNewCardHandler: (cardsPack_id: string) => void
    gradeCardValue: number[]
    onClickSearchModeCardHandler: (newGradeValue: number[], sortBy: SearchCardTextType) => void
    onChangeGradeHandler: (newRangeValue: number[]) => void
    cardsTotalCount: number | null
    packUserId: string,
    token: string
    searchCardMode: boolean
    selectedCardParams: SearchCardTextType
    onClickSearchCardHandler: (newGradeValue: number[] | undefined, sortBy?: SearchCardTextType) => void
}

export const CardProfile = (props: CardsDeckProfilePropsType) => {
    const {user, user_card, logo, name_profile, about, polz, polztit, rangeValues, rangeClass,currentCard,rangeLine} = s;
    const {
        avatar,
        name,
        _id,
        onAddNewCardHandler,
        gradeCardValue,
        onClickSearchModeCardHandler,
        onChangeGradeHandler,
        cardsTotalCount,
        packUserId,
        token,
        searchCardMode,
        selectedCardParams,
        onClickSearchCardHandler

    } = props;
    return (
        <div className={user}>
            <div className={user_card}>
                <div className={logo}>
                    <NavLink to={PATH.PROFILE}><img src={avatar ? avatar : userPhoto} alt=""/></NavLink>
                </div>
                <div className={name_profile}>
                    {name}
                </div>
                <div className={about}>
                    {_id}
                </div>
                <SuperButton disabled={!(_id === packUserId)} onClick={() => {
                    onAddNewCardHandler(token)
                }}>ADD NEW CARD</SuperButton>
            </div>

            <div className={polz}>
                <div className={polztit}>Creator ID: {packUserId}</div>

                <div className={currentCard}>Current of cards: {cardsTotalCount}</div>


                <div className={rangeValues}>
                    <div>min:{gradeCardValue[0]}</div>
                    <div>max:{gradeCardValue[1]}</div>
                </div>
                <div className={rangeClass}>
                    <div className={rangeLine}>
                    <Range step={0.1} min={0} max={5} defaultValue={gradeCardValue} value={gradeCardValue}
                           onChange={onChangeGradeHandler}/>
                    </div>
                    {!searchCardMode &&
                    <SuperButton onClick={() => onClickSearchCardHandler(gradeCardValue)}>search</SuperButton>}
                    {searchCardMode && <SuperButton
                        onClick={() => onClickSearchModeCardHandler(gradeCardValue, selectedCardParams)}>search</SuperButton>}
                </div>
            </div>
        </div>
    )
}