import React from 'react'
import './Button.css'

const Button = props => {
    const cls = [
        props.type,
        props.cls
    ]

    if (props.disabled) {
        cls.push('disabled')
    }
    return (
        <button
            type="button"
            onClick={props.onClick}
            className={cls.join(' ')}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button