import React, {useState} from 'react';
import SuperCheckbox from '../../common/c3-SuperCheckbox/SuperCheckbox';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import s from './test.module.css';

const {test_component, bth_group, input_group, checkbox_group} = s;


const Test = () => {

    const [checked, setChecked] = useState<boolean>(false)//Делает чекбокс управляемым
    const [text, setText] = useState<string>('')//Делает input управляемым
    const error = text ? '' : 'Enter the text'//Для подсветки пустого инпута
    const showAlert = () => {
        if (error) {
            alert('Enter text in control input')
        } else {
            alert(`You was entered : ${text}`) // если нет ошибки показать текст
        }
    }

    return (
        <div className={test_component}>
            <div className={bth_group}>
                <span>Controlled CheckBox</span>
                <SuperCheckbox
                    checked={checked}
                    onChangeChecked={setChecked}/>
                <span>Uncontrolled CheckBox(checked)</span>
                <SuperCheckbox checked/>
                <span>Uncontrolled CheckBox(Unchecked)</span>
                <SuperCheckbox checked={false}/>
            </div>
            <div className={input_group}>
                <span>Controlled input</span>
                <SuperInputText
                    value={text}
                    onChangeText={setText}
                    error={error}/>
                <span>Uncontrolled input(with error)</span>
                <SuperInputText
                    placeholder={'withOutAnyText'}
                    value={''}
                    error={error}/>
                <span>Uncontrolled input(without error)</span>
                <SuperInputText
                    value={'some text'}
                />
            </div>
            <div className={checkbox_group}>
                <span>Btn with out err</span>
                <SuperButton onClick={showAlert}>testOnBTN(click!)</SuperButton>

                <span>Btn with err</span>
                <SuperButton red>testErrorBTN</SuperButton>

                <span>disabled btn</span>
                <SuperButton disabled>testDisabledBTN</SuperButton>
            </div>

        </div>
    );
}

export default Test;
