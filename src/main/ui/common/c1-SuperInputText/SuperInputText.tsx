import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import s from './SuperInputText.module.css'
import cn from './SuperInputText.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    error?: string
    spanClassName?: string
    label: string
}

const {superInput, errorInput} = s;

const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        label,
        className, spanClassName,
        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter(e) // то вызвать его
    }


    const finalInputClassName = restProps.value ? superInput : errorInput;


    return (
        // <input
        //     type={'text'}
        //     onChange={onChangeCallback}
        //     onKeyPress={onKeyPressCallback}
        //     className={finalInputClassName}
        //     placeholder={error}
        //     {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
        // />

    <div className={cn.group}>
        <input
               required
               onChange={onChangeCallback}
               onKeyPress={onKeyPressCallback}
               className={finalInputClassName}
               placeholder={error}
               {...restProps}
        />
            <span className={cn.highlight}></span>
            <span className={cn.bar}></span>
            <label>{label}</label>
    </div>

    )
}

export default SuperInputText
