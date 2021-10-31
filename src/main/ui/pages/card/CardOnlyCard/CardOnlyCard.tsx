import SuperButton from '../../../common/c2-SuperButton/SuperButton';
import React from 'react';
import s from './CardOnlyCard.module.css';
import {OneCardsType} from '../../../../bll/redusers/card-reducer';


type CardOnlyPropsType = {
    searchCardEmpty: string
    AllCards: OneCardsType[]
    searchCardArr: Array<OneCardsType[]> | null
    pageForSearchCardMode: number
    profileId: string | null
    onChangeQuestion: (newText: string) => void
    onChangeAnswer: (newText: string) => void
    onChangeGrade: (newText: number) => void
    setActiveModalUpdateCard: (newStatus: boolean) => void
    setActiveModalDeleteCard: (newStatus: boolean) => void
    setCardPack_id: (newText: string) => void
    setCard_id: (newText: string) => void


}

const {tableTitle, btnBlock} = s


export const CardOnlyCard = (props: CardOnlyPropsType) => {

    const {
        searchCardEmpty,
        searchCardArr,
        AllCards,
        pageForSearchCardMode,
        profileId,

        onChangeQuestion,
        onChangeAnswer,
        onChangeGrade,
        setActiveModalUpdateCard,
        setCardPack_id,
        setCard_id,
        setActiveModalDeleteCard
    } = props

    const onUpdateCardModalHandler = (_id: string, cardPackId: string, question: string, answer: string, grade: number) => {
        setActiveModalUpdateCard(true)
        setCardPack_id(cardPackId)
        setCard_id(_id)
        onChangeQuestion(question)
        onChangeAnswer(answer)
        onChangeGrade(grade)
    }
    const onDeleteCardModalHandler = (_id: string, cardPackId: string) => {
        setActiveModalDeleteCard(true)
        setCardPack_id(cardPackId)
        setCard_id(_id)
    }

    return (
        <tbody>
        {searchCardEmpty &&
        <div className={tableTitle}>{searchCardEmpty}</div>}
        {AllCards && AllCards.map(t =>
            <tr key={t.cardsPack_id}>
                <td>{t.question}</td>
                <td>{t.answer}</td>
                <td>{t.grade.toFixed(1)}</td>
                <td>{new Date(t.updated).toLocaleDateString()}</td>
                <td>{profileId === t.user_id && <SuperButton onClick={() => {
                    onDeleteCardModalHandler(t._id, t.cardsPack_id)
                }}>DELETE</SuperButton>}
                    {profileId === t.user_id && <SuperButton onClick={() => {
                        onUpdateCardModalHandler(t._id, t.cardsPack_id, t.question, t.answer, t.grade)
                    }}>UPDATE</SuperButton>}</td>
            </tr>)}
        {searchCardArr && searchCardArr[pageForSearchCardMode].map(t =>
            <tr key={t.cardsPack_id}>
                <td>{t.question}</td>
                <td>{t.answer}</td>
                <td>{t.grade.toFixed(1)}</td>
                <td>{new Date(t.updated).toLocaleDateString()}</td>
                <td className={btnBlock}> {profileId === t.user_id && <SuperButton onClick={() => {
                    onDeleteCardModalHandler(t._id, t.cardsPack_id)
                }}>DELETE</SuperButton>}
                    {profileId === t.user_id && <SuperButton onClick={() => {
                        onUpdateCardModalHandler(t._id, t.cardsPack_id, t.question, t.answer, t.grade)
                    }}>UPDATE</SuperButton>}</td>
            </tr>)}
        </tbody>
    )
}