import React from 'react'
import './Select.css'


const Select = props => {
    const cls = ['select', props.cls]

    const htmlFor = `${props.label}-${Math.random()}`

    return (
        <div className={cls.join(' ')}>
            {
                props.label ? <label htmlFor={htmlFor}>{props.label}</label> : null
            }
            <select
                id={htmlFor}
                value = {props.value}
                onChange={props.onChange}
                disabled={props.disabled}
            >
                {props.options.map((option, index) => (
                    <option
                        value={option.id}
                        key={option.id + index}
                    >{option.name}</option>
                ))}
            </select>            
        </div>
    )
}

export default Select