import React, {useState} from 'react';
import s from './Paginator.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../../bll/store/store';
import {SetCurrentPage} from '../../../../bll/redusers/tablet-reducer';


const {page, pageSelect, btnGroup} = s;


type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage?: number
}


const Paginator = (props:PaginatorPropsType) => {
    const {totalItemsCount, pageSize, currentPage} = props;

    const dispatch = useDispatch();
    const portionSize=10;


    const onPageChanged=(p:number)=>{
        dispatch(SetCurrentPage(p))
    }

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let allPages = [];
    for (let i = 1; i <= pagesCount; i++) {
        allPages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize);

    const [portionNumber, setPortionNumber] = useState(1);


    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;


    return (

        <div className={btnGroup}>
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>Prev</button> }

            {allPages .filter(t=>t>=leftPortionPageNumber && t<=rightPortionPageNumber)
                .map((p)=>{
                    return <span className={currentPage === p ? pageSelect : page}
                                 key={p}
                                 onClick={()=>{onPageChanged(p)}}>{p}</span>
                })}

            {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber +1)
            }}>Next</button>}
        </div>

    )
}


export default Paginator;


