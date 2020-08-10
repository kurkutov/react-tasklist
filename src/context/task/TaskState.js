import React, {useReducer, useContext} from 'react'
import API from '../../axios/API'
import { TaskContext } from './TaskContext'
import { TaskReducer } from './TaskReducer'
import { AlertContext } from '../alert/AlertContext'
import { INIT_TASKS, SEARCH_TASKS, GET_TASKS, GET_TASKS_BY_STATUS, GET_TASK_STATUSES, GET_TASK_PRIORITIES, GET_TASKS_ERROR, SET_LOADING } from '../types'

export const TaskState = ({children}) => {

    const alert = useContext(AlertContext)

    const initialState = {
        tasks: [],
        taskCount: 0,
        statuses: [],
        priorities: [],
        activeStatusId: 0,
        searchString: "",
        loading: false,
        error: false
    }

    const [state, dispatch]  = useReducer(TaskReducer, initialState)
    // вспомогательная функция, для отправки запросов на сервер
    const getProc = async (dispatchObj, req = null) => {
        setLoading()

        try {
            const response = await API.post("/", req)
            
            dispatchObj.payload = response.data

            dispatch(dispatchObj)
            
        } catch (error) {
            dispatch({
                type: GET_TASKS_ERROR
            })
        }
    }
    // функция инициализации, получение первичных данных приложения
    const init = async (taskStatusId = 0) => {
        setLoading()
        getProc({ type: INIT_TASKS, activeStatusId: taskStatusId }, { action: 'init', state_id: taskStatusId })
    }
    //  удаление задачи
    const deleteTask = async taskId => {
        setLoading()
        try {
            const response = await API.post("/", { action: 'delete', task_id: taskId, state_id: activeStatusId, search_string: searchString})

            if (response.data !== false ) {
                alert.show("Задача удалена успешно!", "success")
                dispatch({ type: INIT_TASKS, activeStatusId: activeStatusId, payload: response.data })
            } else {
                alert.show("<b>Ошибка!</b> Не удалось удалить задачу", "danger")
            }
            
        } catch (error) {
            dispatch({
                type: GET_TASKS_ERROR
            })
        }
    }

    // Добавление или Обновление задачи
    // taskData - объект, имеет стуктуру задачи
    // action - строка, 'add' - добавление,  'update' - обновление задачи
    const addOrUpdateTask = async (taskData, action = 'add') => {
        setLoading()
        try {
            const response = await API.post("/", { action: action, data: taskData, state_id: activeStatusId, search_string: searchString})
            if (response.data !== false ) {
                const message = 'Задача ' + (action === 'add' ? 'добавлена' : 'изменена') + ' успешно!'
                alert.show(message, "success")
                dispatch({ type: INIT_TASKS, activeStatusId: activeStatusId, payload: response.data })
            } else {
                const message = 'Ошибка! Не удалось ' + (action === 'add' ? 'добавить' : 'изменить') + ' задачу'
                alert.show(message, "danger")
            }
            
        } catch (error) {
            dispatch({
                type: GET_TASKS_ERROR
            })
        }
    }
    
    // Поиск задач
    const search = searchString => {
        getProc({type: SEARCH_TASKS, searchString: searchString},{action:'search', search_string: searchString})
    }
    // получение всех возможных статусов задачи
    const getTaskStatuses = () => {
        getProc({type: GET_TASK_STATUSES}, {action:'statuses'})
    }
    // получение всех возможных приоритетов задачи
    const getTaskPriorities = () => {
        getProc({type: GET_TASK_PRIORITIES}, {action:'priorities'})
    }
    // получение задач по id их статуса
    const getTasks = (taskStatusId = 0) => {
        alert.hide()
        let tp = GET_TASKS_BY_STATUS
        if (taskStatusId === 0) {
            tp = GET_TASKS
        }
        getProc({ type: tp, activeStatusId: taskStatusId }, { action: 'tasks', state_id: taskStatusId })
    }

    const setLoading = () => dispatch({type: SET_LOADING})

    const {tasks, taskCount, statuses, priorities, activeStatusId, searchString, error, loading} = state

    return (
        <TaskContext.Provider value={{
            init, addOrUpdateTask, getTasks, deleteTask, getTaskStatuses, getTaskPriorities, search, setLoading,
            tasks, taskCount, statuses, priorities, activeStatusId, searchString, error, loading
        }}>
            {children}
        </TaskContext.Provider>
    )
}