import { INIT_TASKS, SEARCH_TASKS, GET_TASKS, GET_TASKS_BY_STATUS, GET_TASK_STATUSES, GET_TASK_PRIORITIES, GET_TASKS_ERROR, SET_LOADING, DELETE_TASK } from "../types"

const handlers = {
    [INIT_TASKS]: (state, {payload, activeStatusId}) =>({
        ...state, 
        tasks: payload.tasks, 
        statuses: payload.states, 
        priorities: payload.priorities,
        taskCount: payload.tasks.length, 
        loading:false}),
    [SEARCH_TASKS]: (state, {payload, searchString, activeStatusId}) => ({...state, tasks: payload, searchString, activeStatusId: -1, loading: false}),
    [GET_TASK_STATUSES]: (state, {payload}) => ({...state, statuses: payload, loading: false}),
    [GET_TASK_PRIORITIES]: (state, {payload}) => ({...state, priorities: payload, loading: false}),
    [GET_TASKS]:    (state, {payload, activeStatusId, searchString}) => ({...state, tasks: payload, taskCount: payload.length, activeStatusId: activeStatusId, searchString: "", loading:false}),
    [GET_TASKS_BY_STATUS]:    (state, {payload, activeStatusId, searchString}) => ({...state, tasks: payload, activeStatusId: activeStatusId, searchString: "", loading:false}),
    [GET_TASKS_ERROR]:    (state, {message}) => ({...state, error: true, loading:false}),
    [SET_LOADING]:  state => ({...state, loading: true}),
    DEFAULT: state => state
}

export const TaskReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}