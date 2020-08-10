import React, {useContext, useState} from 'react'
import {TaskContext} from '../../context/task/TaskContext'
import { AlertContext } from '../../context/alert/AlertContext'
import Input from '../UI/Input/Input'

const Search = () => {

    const {search, searchString} = useContext(TaskContext)
    const alert = useContext(AlertContext)

    const [value, setValue] = useState(searchString)

    // Выполнение поиска
    const onSubmit = (event) => {

        if (event.key !== 'Enter') {
           return
        }

        if (value.trim()) {
            search(value.trim())
            alert.hide()
        } else {
            alert.show('Введите данне поиска', "danger")
            event.target.classList.add("invalid")
        }
    }

    return (
        <React.Fragment>
            <Input 
                type="text" 
                label="Поиск" 
                cls="search"
                value={value}
                onChange={event => setValue(event.target.value)}
                onKeyPress={event => onSubmit(event)}
            />
        </React.Fragment>
    )
}

export default Search