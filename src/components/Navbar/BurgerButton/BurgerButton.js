import React from 'react'
import './BurgerButton.css'

const BurgerButton = props => (
    <i 
        className={'burger-button fa fa-bars'}
        onClick={props.onToggle}
    />
)


export default BurgerButton