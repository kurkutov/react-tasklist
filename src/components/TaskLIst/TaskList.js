import React, {useContext} from 'react'
import {TaskContext} from '../../context/task/TaskContext'
import {Task} from './Task/Task'


export const TaskList = props => {
    
    const {tasks, statuses, priorities, deleteTask} = useContext(TaskContext)
    const headers = {
        description: "Описание",
        state_id: "Статус", 
        priority_id: "Приоритет", 
        planned_end_date: "Плановая дата окончания",
        actual_end_date: "Фактическая дата окончания",
        actions: "Действия" 
    }

    return (
        <React.Fragment>
            <div className="task-list">
                { tasks.length > 0 ? 
                    <React.Fragment>
                        {window.innerWidth <= 992 ? null : <div className="task-desktop">{Object.keys(headers).map((hKey, index) => (<div key={index} className="task-desktop-item"><b>{headers[hKey]}</b></div>))} </div>}
                        { tasks.map((task, idx) => (<Task
                            key={idx}
                            index={idx}
                            task={task} 
                            statuses={statuses} 
                            priorities={priorities} 
                            deleteOnClick={deleteTask}
                            modalHandler={props.modalHandler}
                            headers={headers} />)) }
                    </React.Fragment>   
                : <div>Нет результата по вашему запросу</div>
                }

            </div>        
        </React.Fragment>

    )
    
}