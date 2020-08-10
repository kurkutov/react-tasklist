import React, { useContext, useEffect } from 'react'
import { TaskContext } from '../context/task/TaskContext'


export const Home = () => {

    const context = useContext(TaskContext)

    
    useEffect( () => {
        context.getTasks()
    }, [])
    
    return (
        <div>
            <h1>Home page</h1>
            <div className="task-list">
               {console.log("вызовд задача",context.tasks)}
            </div>

           
        </div>
    )
}