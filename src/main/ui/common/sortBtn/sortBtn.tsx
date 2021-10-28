import s from './sortBtn.module.css';
import React from 'react';
import {sortCardsStatusType} from '../../../bll/redusers/card-reducer';
import {SortPackType} from '../../../bll/redusers/tablet-reducer';


const{activeBtn}=s;

export type SortBtnType = {
    sortStatus: sortCardsStatusType | SortPackType
    onSortBtnHandler: (newSortStatus: any)=>void
    property:string
}


export const SortBtn = (props: SortBtnType) => {
    const {sortStatus, onSortBtnHandler,property} = props;
    return (
        <div>
            <button className={sortStatus.indexOf('1'+property) !== -1 ? activeBtn : ''}
                    onClick={()=>{onSortBtnHandler(1+property)}}>/\
            </button>
            <button className={sortStatus.indexOf('0'+property) !== -1 ? activeBtn  : ''}
                    onClick={()=>{onSortBtnHandler(0+property)}}>\/
            </button>

        </div>)
}