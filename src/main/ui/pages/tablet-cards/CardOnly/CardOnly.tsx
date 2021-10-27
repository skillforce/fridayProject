import {NavLink} from 'react-router-dom';
import SuperButton from '../../../common/c2-SuperButton/SuperButton';
import React from 'react';
import {cardType} from '../../../../bll/redusers/tablet-reducer';
import s from './CardOnly.module.css';


type CardOnlyPropsType ={
    searchEmpty:string
    cardPacks:cardType[]
    searchCardsArr:Array<cardType[]> | null
    pageForSearchMode:number
    profileId:string|null
    onDeleteCardsHandler:(CardId:string)=>void
    onClickUpdateHandler:(CardId:string)=>void

}

const{tableTitle,btnBlock}=s


export const CardOnly = (props:CardOnlyPropsType)=>{

    const{pageForSearchMode,searchEmpty,cardPacks,searchCardsArr,onDeleteCardsHandler,onClickUpdateHandler,profileId}=props

    return(
        <tbody>
        {searchEmpty &&
        <div className={tableTitle} >{searchEmpty}</div>}
    {cardPacks && cardPacks.map((t:any) =>
        <tr key={t._id}>
            <td>{t.name}</td>
            <td>{t.cardsCount}</td>
            <td>{t.updated ? new Date(t.updated).toLocaleDateString() : ''}</td>
            <td>{t.user_name}</td>
            <td className={btnBlock}><NavLink
                to={'/card/' + t._id}><SuperButton>Learn</SuperButton></NavLink>
                {t.user_id === profileId &&
                <SuperButton onClick={() => onDeleteCardsHandler(t._id)}>del</SuperButton>}
                {t.user_id === profileId &&
                <SuperButton onClick={() => onClickUpdateHandler(t._id)}>update</SuperButton>}
            </td>
        </tr>)}

    {searchCardsArr && searchCardsArr[pageForSearchMode].map((t:any) =>
        <tr key={t._id}>
            <td>{t.name}</td>
            <td>{t.cardsCount}</td>
            <td>{t.updated ? new Date(t.updated).toLocaleDateString() : ''}</td>
            <td>{t.user_name}</td>
            <td className={btnBlock}><NavLink
                to={'/card/' + t._id}><SuperButton>Learn</SuperButton></NavLink>
                {t.user_id === profileId &&
                <SuperButton onClick={() => onDeleteCardsHandler(t._id)}>del</SuperButton>}
                {t.user_id === profileId &&
                <SuperButton onClick={() => onClickUpdateHandler(t._id)}>update</SuperButton>}
            </td>
        </tr>)}
        </tbody>
    )
}