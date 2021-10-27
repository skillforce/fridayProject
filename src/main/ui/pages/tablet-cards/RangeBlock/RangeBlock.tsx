import s from '../tablet-cards.module.css';
import SuperInputText from '../../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../../common/c2-SuperButton/SuperButton';
import SuperSelect from '../../../common/c5-SuperSelect/SuperSelect';
import React, {SyntheticEvent} from 'react';
import {SearchTextType} from '../../../../bll/redusers/tablet-reducer';


type RangeBlockType = {
    selectedParams: SearchTextType
    onHandlerSearch: (e: SyntheticEvent<HTMLInputElement>) => void
    onClickSearchBtnHandler: (newMinMaxCurrent?: number[], sortBy?: SearchTextType) => void
    search: string
    searchMode: boolean
    onAllPagesHandler: () => void
    selectParamsOptions: SearchTextType[]
    setOptionParams: (newOption: SearchTextType) => void

}


export const RangeBlock = (props: RangeBlockType) => {

    const {
        selectedParams,
        onHandlerSearch,
        onClickSearchBtnHandler,
        search,
        searchMode,
        onAllPagesHandler,
        selectParamsOptions,
        setOptionParams
    } = props;
    return (
        <div className={s.inp}>
            <div style={{display: 'flex'}}>
                {selectedParams === 'By name' &&
                <SuperInputText onChange={onHandlerSearch} value={search} label="Search by name"/>}
                {selectedParams === 'By creator' &&
                <SuperInputText onChange={onHandlerSearch} value={search} label="Search by creator"/>}
                <SuperButton disabled={search === ''}
                             onClick={() => onClickSearchBtnHandler(undefined, selectedParams)}>search</SuperButton>
                {searchMode && <SuperButton onClick={onAllPagesHandler}>go to all</SuperButton>}
            </div>
            <SuperSelect onChangeOption={setOptionParams} options={selectParamsOptions}/>
        </div>
    )


}