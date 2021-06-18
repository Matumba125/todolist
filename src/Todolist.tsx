import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeCheckbox: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<null | string>('')

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim());
        } else {
            setError('Title is required')
        }
        setTitle("");

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask();
        }
    }

    const onFilterClickHandler = (filterValue: FilterValuesType) =>{
        return () => props.changeFilter(filterValue);
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   className={error ? 'error' : ''}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={error ? 'errorMessage' : ''}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    const isDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeCheckbox(t.id, event.currentTarget.checked)
                    }

                    return <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={isDoneHandler}
                        />
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button
                className={props.filter === 'All' ? 'activeFilter' : ''}
                onClick={onFilterClickHandler("All")}>
                All
            </button>
            <button
                className={props.filter === 'Active' ? 'activeFilter' : ''}
                onClick={onFilterClickHandler("Active")}>
                Active
            </button>
            <button
                className={props.filter === 'Completed' ? 'activeFilter' : ''}
                onClick={onFilterClickHandler("Completed")}>
                Completed
            </button>
        </div>
    </div>
}
