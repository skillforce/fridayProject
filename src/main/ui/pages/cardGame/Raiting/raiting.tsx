import React, {useEffect, useState} from 'react';
import Star from './star/star';
import s from './raiting.module.css';
import {useDispatch} from 'react-redux';
import {putMark} from '../../../../bll/redusers/card-game-reducer';

const {raiting} = s;

export type RatingPropsType = {
    cardId: string
    cardPackId: string
    value: number
    setValue: (newValue: number) => void
}


export function Rating(props: RatingPropsType) {

    const dispatch = useDispatch()
    const {cardId, cardPackId, value, setValue} = props;


    useEffect(() => {
        {value > 0 && dispatch(putMark(value, cardId, cardPackId))}
    }, [value])


    return (
        <div className={raiting}>
            <Star setValue={() => {
                setValue(1)
            }} selected={value > 0}/>

            <Star setValue={() => {
                setValue(2)
            }} selected={value > 1}/>

            <Star setValue={() => {
                setValue(3)
            }} selected={value > 2}/>

            <Star setValue={() => {
                setValue(4)
            }} selected={value > 3}/>

            <Star setValue={() => {
                setValue(5)
            }} selected={value > 4}/>

        </div>
    )
}
