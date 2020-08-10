import React from 'react'
import './Task.css'
import Button from '../../UI/Button/Button'
import {formatDate} from '../../UI/date/dateFramework'


export const Task = props => {
    
    let cls = window.innerWidth <= 992 ? 'task-mobile' : 'task-desktop';

    return (
    
    <div className={cls}>
        {Object.keys(props.task).map((tKey, index) => {
            let value = ""
             if (tKey === "id") {
                return null
            } else if (props.task[tKey] === null) {
                value = "-"
            } else if (tKey === "state_id") {
                value = props.statuses[+props.task[tKey] - 1].name
            } else if (tKey === "priority_id") {
                value = props.priorities[+props.task[tKey] - 1].name
            } else if (tKey === "planned_end_date" || tKey === "actual_end_date") {
                value = formatDate(props.task[tKey])
            } else {
                value = props.task[tKey]
            }

            if (window.innerWidth <= 992) {
                return (
                    <div className="task-options-item" key={index}>
                        <div className="task-options-item-label"><b>{props.headers[tKey]}:</b></div>
                        <div className="task-options-item-data">{value}</div>
                    </div>)
            } else {
                return (<div key={index} className="task-desktop-item">{value}</div>)
            }
            })}
            { window.innerWidth <= 992 ? 
                <div className="task-options-item">
                    <div className="task-options-item-label"><b>Действия:</b></div>
                    <div className="task-options-item-data">
                        <Button cls = "link" onClick={() => props.modalHandler(props.index)}>Изменить</Button>
                        <Button cls = "link" onClick={() => props.deleteOnClick(props.task.id)}>Удалить</Button>
                    </div>
                </div>
            :
                <div className="task-desktop-item task-actions">
                    <Button cls = "link" onClick={() => props.modalHandler(props.index)}>Изменить</Button>
                    <Button cls = "link" onClick={() => props.deleteOnClick(props.task.id)}>Удалить</Button>
                </div>
            }
    </div>
)}