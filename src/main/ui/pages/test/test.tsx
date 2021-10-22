import React, {useState} from 'react';
import SuperCheckbox from '../../common/c3-SuperCheckbox/SuperCheckbox';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import s from './test.module.css';
import user from '../../../../assets/img/user.png'

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
        <>
        {/*<div className={test_component}>*/}
        {/*    <div className={bth_group}>*/}
        {/*        <span>Controlled CheckBox</span>*/}
        {/*        <SuperCheckbox*/}
        {/*            checked={checked}*/}
        {/*            onChangeChecked={setChecked}/>*/}
        {/*        <span>Uncontrolled CheckBox(checked)</span>*/}
        {/*        <SuperCheckbox checked/>*/}
        {/*        <span>Uncontrolled CheckBox(Unchecked)</span>*/}
        {/*        <SuperCheckbox checked={false}/>*/}
        {/*    </div>*/}
        {/*    <div className={input_group}>*/}
        {/*        <span>Controlled input</span>*/}
        {/*        <SuperInputText*/}
        {/*            value={text}*/}
        {/*            onChangeText={setText}*/}
        {/*            error={error}/>*/}
        {/*        <span>Uncontrolled input(with error)</span>*/}
        {/*        <SuperInputText*/}
        {/*            placeholder={'withOutAnyText'}*/}
        {/*            value={''}*/}
        {/*            error={error}/>*/}
        {/*        <span>Uncontrolled input(without error)</span>*/}
        {/*        <SuperInputText*/}
        {/*            value={'some text'}*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*    <div className={checkbox_group}>*/}
        {/*        <span>Btn with out err</span>*/}
        {/*        <SuperButton onClick={showAlert}>testOnBTN(click!)</SuperButton>*/}

        {/*        <span>Btn with err</span>*/}
        {/*        <SuperButton red>testErrorBTN</SuperButton>*/}

        {/*        <span>disabled btn</span>*/}
        {/*        <SuperButton disabled>testDisabledBTN</SuperButton>*/}
        {/*    </div>*/}

        {/*</div>*/}

            <div className={s.profile}>
                <div className={s.user}>
                    <div className={s.user_card}>
                        <div className={s.logo}>
                            <img src={user} alt=""/>
                        </div>
                        <div className={s.name}>
                            Petr Ivanov
                        </div>
                        <div className={s.about}>
                            Front end developer
                        </div>
                    </div>

                    <div className={s.polz}>
                        <div className={s.polztit}>Number of cards</div>
                        <br/>
                        <br/>
                        тут добавишь ренж :)
                    </div>
                </div>
                <div className={s.table}>
                    <div className={s.tit}>
                        Pack list Petr's
                    </div>
                    <div className={s.inp}>
                        <SuperInputText placeholder="Search"/>
                    </div>
                    <table className={s.mainTab}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Cards</th>
                                <th>Last Updated</th>
                                <th>Created by</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pack name Pack</td>
                                <td>123</td>
                                <td>18.12.2022</td>
                                <td>Mike Tyson</td>
                                <td><SuperButton>Learn</SuperButton></td>
                            </tr>
                            <tr>
                                <td>Pack name Pack</td>
                                <td>123</td>
                                <td>18.12.2022</td>
                                <td>Mike Tyson</td>
                                <td><SuperButton>Learn</SuperButton></td>
                            </tr>
                            <tr>
                                <td>Pack name Pack</td>
                                <td>123</td>
                                <td>18.12.2022</td>
                                <td>Mike Tyson</td>
                                <td><SuperButton>Learn</SuperButton></td>
                            </tr>
                            <tr>
                                <td>Pack name Pack</td>
                                <td>123</td>
                                <td>18.12.2022</td>
                                <td>Mike Tyson</td>
                                <td><SuperButton>Learn</SuperButton></td>
                            </tr>
                            <tr>
                                <td>Pack name Pack</td>
                                <td>123</td>
                                <td>18.12.2022</td>
                                <td>Mike Tyson</td>
                                <td><SuperButton>Learn</SuperButton></td>
                            </tr>
                            <tr>
                                <td>Pack name Pack</td>
                                <td>123</td>
                                <td>18.12.2022</td>
                                <td>Mike Tyson</td>
                                <td><SuperButton>Learn</SuperButton></td>
                            </tr>
                        </tbody>

                    </table>

                    тут добавишь кнопочки :)
                </div>
            </div>
        </>
    );
}

export default Test;
