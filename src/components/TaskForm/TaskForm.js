import React, {useContext, useState} from 'react'
import {TaskContext} from '../../context/task/TaskContext'
import {createControl,validate,validateForm} from '../UI/form/formFramework'
import {getCurrentDate} from '../UI/date/dateFramework'
import Input from '../UI/Input/Input'
import Select from '../UI/Select/Select'
import Button from '../UI/Button/Button'

export const TaskForm = props => {

    const {statuses, priorities, tasks, addOrUpdateTask} = useContext(TaskContext)

    const isEdit =  props.taskId !== null
    
    const [formState, setValue] = useState({
        isFormValid: false,
        formControls:{
            id: createControl({value: tasks.hasOwnProperty(props.taskId) ? tasks[props.taskId].id : ''}, null, isEdit),
            description: createControl({value: tasks.hasOwnProperty(props.taskId) ? tasks[props.taskId].description : ''}, {required: true}, isEdit),
            priority_id: createControl({value: tasks.hasOwnProperty(props.taskId) ? tasks[props.taskId].priority_id : '1'}, null, isEdit),
            state_id: createControl({value: tasks.hasOwnProperty(props.taskId) ? tasks[props.taskId].state_id : '1'}, null, isEdit),
            planned_end_date: createControl({value: tasks.hasOwnProperty(props.taskId) ? tasks[props.taskId].planned_end_date : getCurrentDate()}, null, isEdit),
            actual_end_date: createControl({value: tasks.hasOwnProperty(props.taskId) ? tasks[props.taskId].actual_end_date : null}, null, isEdit),
        }
    })

    // Изменение полей формы
    const inputChageHandler = (value, controlName) => {
        const newFormState = {...formState}

        const control = {...newFormState.formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)
        
        newFormState.formControls[controlName] = control
        newFormState.isFormValid = validateForm(newFormState.formControls)
        // обновление state
        setValue(newFormState)
    }

    // Отправка формы, если add = true - добавление, false - обновление
    const formHundler = add => {
        const data = {}
        for (const key in formState.formControls) {
            if (formState.formControls.hasOwnProperty(key)) {
                data[key] = formState.formControls[key].value
            }
        }
        data.actual_end_date = statuses[+data.state_id - 1 + ""].name === "Завершена" ? getCurrentDate() : null
        console.log("Отправка формы",data) 
        const action = add ? 'add' : 'update'
        addOrUpdateTask(data, action)

    }

    const submitHandler = event => {
        event.preventDefault()
    }

    return (
        <div className="">
            <form onSubmit={submitHandler}>
                <Input 
                    type="text" 
                    label="Описание(*)" 
                    value={formState.formControls.description.value}
                    valid={formState.formControls.description.valid}
                    touched={formState.formControls.description.touched}
                    shouldValidate={!!formState.formControls.description.validation}
                    errorMessage={'Поле «Описание» не должно быть пустым'}
                    onChange={event => inputChageHandler(event.target.value, 'description')}
                />
                <Select
                    options={priorities}
                    label="Приоритет:"
                    value={formState.formControls.priority_id.value}
                    onChange={event => inputChageHandler(event.target.value, 'priority_id')}

                />
                <Select
                    options={statuses}
                    label="Статус:"
                    value={formState.formControls.state_id.value}
                    disabled={!isEdit}
                    onChange={event => inputChageHandler(event.target.value, 'state_id')}

                />
                <Input 
                    type="date" 
                    label="Крайний срок:" 
                    value={formState.formControls.planned_end_date.value}
                    valid={formState.formControls.planned_end_date.valid}
                    touched={formState.formControls.planned_end_date.touched}
                    shouldValidate={!!formState.formControls.planned_end_date.validation}
                    errorMessage={'Поле «Крайняя дата» не должно быть пустым'}
                    onChange={event => inputChageHandler(event.target.value, 'planned_end_date')}
                />
                {isEdit ?
                    <Button
                        type="default"
                        cls="btn"
                        onClick={() => (formHundler(false))}
                        disabled={!formState.isFormValid}
                    >Изменить задачу</Button>
                :
                    <Button
                        type="default"
                        cls="btn"
                        onClick={() => (formHundler(true))}
                        disabled={!formState.isFormValid}
                    >Добавить задачу</Button>
                }

                
            </form>
        </div>
    )
}