import {NavLink} from 'react-router-dom';
import SuperButton from '../../../common/c2-SuperButton/SuperButton';
import React from 'react';
import {cardType} from '../../../../bll/redusers/tablet-reducer';
import s from './CardOnly.module.css';


type CardOnlyPropsType = {
    searchEmpty: string
    cardPacks: cardType[]
    searchCardsArr: Array<cardType[]> | null
    pageForSearchMode: number
    profileId: string | null
    setActiveModalUpdateDeck: (newActiveStatus: boolean) => void
    setActiveModalDeleteDeck: (newActiveStatus: boolean) => void
    setCardIdInModal: (newId: string) => void
    setNameDeck: (newText: string) => void

}

const {tableTitle, btnBlock} = s


export const CardOnly = (props: CardOnlyPropsType) => {

    const {
        pageForSearchMode,
        searchEmpty,
        cardPacks,
        searchCardsArr,
        profileId,
        setActiveModalUpdateDeck,
        setCardIdInModal,
        setActiveModalDeleteDeck,
        setNameDeck
    } = props

    const onClickUpdateBtnHandler = (newId: string, name: string) => {
        setCardIdInModal(newId)
        setNameDeck(name)
        setActiveModalUpdateDeck(true)
    }
    const onClickDeleteBtnHandler = (newId: string) => {
        setCardIdInModal(newId)
        setActiveModalDeleteDeck(true)
    }


    return (
        <tbody>
        {searchEmpty &&
        <div className={tableTitle}>{searchEmpty}</div>}
        {cardPacks && cardPacks.map((t: any) =>
            <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.cardsCount}</td>
                <td>{t.updated ? new Date(t.updated).toLocaleDateString() : ''}</td>
                <td>{t.user_name}</td>
                <td className={btnBlock}><NavLink
                    to={'/card/' + t._id}><SuperButton>look</SuperButton></NavLink>
                    {t.cardsCount !== 0 && <NavLink to={'/game/' + t._id}><SuperButton>play</SuperButton></NavLink>}
                    {t.user_id === profileId &&
                    <SuperButton onClick={() => onClickDeleteBtnHandler(t._id)}>del</SuperButton>}
                    {t.user_id === profileId &&
                    <SuperButton onClick={() => onClickUpdateBtnHandler(t._id, t.name)}>update</SuperButton>}
                </td>
            </tr>)}

        {searchCardsArr && searchCardsArr[pageForSearchMode].map((t: any) =>
            <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.cardsCount}</td>
                <td>{t.updated ? new Date(t.updated).toLocaleDateString() : ''}</td>
                <td>{t.user_name}</td>
                <td className={btnBlock}><NavLink
                    to={'/card/' + t._id}><SuperButton>look</SuperButton></NavLink>

                    {t.cardsCount !== 0 && <NavLink to={'/game/' + t._id}><SuperButton>play</SuperButton></NavLink>}
                    {t.user_id === profileId &&
                    <SuperButton onClick={() => onClickDeleteBtnHandler(t._id)}>del</SuperButton>}
                    {t.user_id === profileId &&
                    <SuperButton onClick={() => onClickUpdateBtnHandler(t._id, t.name)}>update</SuperButton>}
                </td>
            </tr>)}
        </tbody>
    )
}