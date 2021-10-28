import s from '../../pages/tablet-cards/tablet-cards.module.css';
import SuperInputText from '../c1-SuperInputText/SuperInputText';
import SuperButton from '../c2-SuperButton/SuperButton';
import SuperSelect from '../c5-SuperSelect/SuperSelect';
import React, {SyntheticEvent} from 'react';


type RangeBlockType = {
    selectedParams: any
    onHandlerSearch: (e: SyntheticEvent<HTMLInputElement>) => void
    onClickSearchBtnHandler: any
    search: string
    searchMode: boolean
    onAllPagesHandler: () => void
    selectParamsOptions: any
    setOptionParams: any
    searchProperty:string[]

}


export const SearchBlock = (props: RangeBlockType) => {

    const {
        selectedParams,
        onHandlerSearch,
        onClickSearchBtnHandler,
        search,
        searchMode,
        onAllPagesHandler,
        selectParamsOptions,
        setOptionParams,
        searchProperty
    } = props;
    return (
        <div className={s.inp}>
            <div style={{display: 'flex'}}>
                {selectedParams === searchProperty[0] &&
                <SuperInputText onChange={onHandlerSearch} value={search} label="Search by name"/>}
                {selectedParams === searchProperty[1] &&
                <SuperInputText onChange={onHandlerSearch} value={search} label="Search by creator"/>}
                <SuperButton disabled={search === ''}
                             onClick={() => onClickSearchBtnHandler(undefined, selectedParams)}>search</SuperButton>
                {searchMode && <SuperButton onClick={onAllPagesHandler}>go to all</SuperButton>}
            </div>
            <SuperSelect onChangeOption={setOptionParams} options={selectParamsOptions}/>
        </div>
    )


}