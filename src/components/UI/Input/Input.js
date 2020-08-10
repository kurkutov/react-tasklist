import React from 'react'
import './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {
    const inputType = props.type || 'text'
    const cls = ['input', props.cls]

    const htmlFor = `${inputType}-${Math.random()}`

    if (isInvalid(props)) {
        cls.push('invalid')
    }

    return (
        <div className={cls.join(' ')}>
            {
                props.label ? <label htmlFor={htmlFor}>{props.label}</label> : null
            }
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
                onKeyPress={props.onKeyPress}
               
            />
            
            {
                isInvalid(props) ? <span>{props.errorMessage || 'Введите верное значение'}</span> : null
            }
            
        </div>
    )
}

export default Input