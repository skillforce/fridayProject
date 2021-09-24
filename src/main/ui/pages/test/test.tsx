import React, {useState} from 'react';
import SuperCheckbox from '../../common/c3-SuperCheckbox/SuperCheckbox';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import s from './test.module.css';

const{test_component}=s;



const Test = () => {

    const [checked, setChecked] = useState<boolean>(false)//Делает чекбокс управляемым
    const [text, setText] = useState<string>('')//Делает input управляемым
    const error = text ? '' : 'Enter the text'//Для подсветки пустого инпута
    return (
        <div className={test_component}>
            <SuperCheckbox
                checked={checked}
                onChangeChecked={setChecked}/>
            <SuperInputText
                value={text}
                onChangeText={setText}
                error={error}/>
            <SuperButton>testBTN</SuperButton>
        </div>
    );
}

export default Test;
