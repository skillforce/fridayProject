import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    disabled?: boolean
    onClick?: () => void
    filter?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className, disabled, onClick,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalClassName = `${red ? s.red : s.default} ${className}`
    const isDisabledClass = `${disabled ? s.disableClass : finalClassName}`

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={isDisabledClass}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}

export default SuperButton
