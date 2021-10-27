import SuperButton from '../../../common/c2-SuperButton/SuperButton';
import React from 'react';
import {cardType} from '../../../../bll/redusers/tablet-reducer';
import s from './CardOnlyCard.module.css';
import {OneCardsType} from '../../../../bll/redusers/card-reducer';


type CardOnlyPropsType ={
    searchCardEmpty:string
    AllCards:OneCardsType[]
    searchCardArr: Array<OneCardsType[]> | null
    pageForSearchCardMode:number
    profileId:string|null
    onDeleteCardHandler:(cardId: string, cardsPack_id: string)=>void
    onUpdateCardHandler:(_id: string, cardsPack_id: string)=>void

}

const{tableTitle,btnBlock}=s


export const CardOnlyCard = (props:CardOnlyPropsType)=>{

    const{searchCardEmpty,searchCardArr,AllCards,pageForSearchCardMode,profileId,onDeleteCardHandler,onUpdateCardHandler}=props

    return(
        <tbody>
        {searchCardEmpty &&
        <div className={tableTitle}>{searchCardEmpty}</div>}
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
            <td className={btnBlock}><SuperButton onClick={() => {
                onDeleteCardHandler(t._id, t.cardsPack_id)
            }}>DELETE</SuperButton>
                <SuperButton onClick={() => {
                    onUpdateCardHandler(t._id, t.cardsPack_id)
                }}>UPDATE</SuperButton></td>
        </tr>)}
</tbody>
    )
}