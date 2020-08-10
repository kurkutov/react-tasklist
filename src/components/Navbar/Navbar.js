import React, {useContext} from 'react'

import {TaskContext} from '../../context/task/TaskContext'
import './Navbar.css'
import Button from '../UI/Button/Button'
import BurgerButton from './BurgerButton/BurgerButton'
import Search from '../Search/Search'

export const Navbar = props => {
    
    const {getTasks, statuses, activeStatusId, taskCount} = useContext(TaskContext)
    
    // создание массива меню
    let menuPoint =[{id:0, name: "Все", quantity: taskCount}]
    menuPoint.push(...statuses)

    // нажатие кнопки меню
    const navItemOnClick = (elem, taskStatusId) => {
        let elems = document.getElementsByClassName("nav-item")
        if (activeStatusId >= 0) {
            elems[activeStatusId].classList.remove("active")
        }
        elem.classList.add("active")
        getTasks(taskStatusId)
    }
    // управление меню на мобильных устройствах
    const burgerClick = event => {
        let nav = document.querySelector('.navbar-nav')
        let absoluteHeight = nav.scrollHeight;
        let height = nav.clientHeight;
        if (height > 0) {
            nav.style.height = 0 + 'px';
        } else {
            nav.style.height = absoluteHeight + 'px';
        }
    }

    return (
        <nav className="navbar">
            <BurgerButton onToggle={burgerClick}/>
            <Button type="default" cls="btn btn-task-add" onClick={() => {props.modalHandler(null)}}>Добавить</Button>
            <Search/>
            {   
                <div className="navbar-nav">
                    {menuPoint.map((status, idx) => {
                        let classes = "nav-item"
                        if (status.id == activeStatusId) classes += " active"
                        return (
                        <Button
                            key = { idx }
                            cls = {classes}
                            onClick={event => {
                                navItemOnClick(event.target, status.id)
                            }
                        } >{status.name + " (" + status.quantity + ")" }</Button>      
                    )})
                    }

                </div>

            }
            
        </nav>
)}