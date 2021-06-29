import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    todoListID: string
    removeTask: (taskId: string, todoListID: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, newValue: string, todoListID: string) => void
    changeTodoListTitle: (newValue: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    todoListFilter: FilterValuesType

}

export function Todolist(props: PropsType) {

    const addTask = (title: string) =>{
        props.addTask(title, props.todoListID);
    }

    const onFilterClickHandler = (filterValue: FilterValuesType) =>{
        return () => props.changeTodoListFilter(filterValue, props.todoListID);
    }

    const onClickRemoveTodoList =()=> props.removeTodoList(props.todoListID)

    const onChangeTitleHandler = (newValue: string) => {
        props.changeTodoListTitle(newValue, props.todoListID)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
            <button onClick={onClickRemoveTodoList}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.todoListID)
                    const isDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, event.currentTarget.checked, props.todoListID)
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.todoListID)
                    }


                    return <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={isDoneHandler}
                        />
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button
                className={props.todoListFilter === 'All' ? 'activeFilter' : ''}
                onClick={onFilterClickHandler("All")}>
                All
            </button>
            <button
                className={props.todoListFilter === 'Active' ? 'activeFilter' : ''}
                onClick={onFilterClickHandler("Active")}>
                Active
            </button>
            <button
                className={props.todoListFilter === 'Completed' ? 'activeFilter' : ''}
                onClick={onFilterClickHandler("Completed")}>
                Completed
            </button>
        </div>
    </div>
}



