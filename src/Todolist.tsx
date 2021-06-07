import React from 'react';
import './App.css';
import {keyType} from "./App";
import {Button} from "./components/Button";
import Input from "./components/Input";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTasks: (id: string) => void
    changeFilter: (key: keyType) => void
    addTask: (newTitle: string) => void
}

function Todolist(props: TodolistPropsType) {
    const changeFilterAll = () => {
        props.changeFilter("All")
    }
    const changeFilterActive = () => {
        props.changeFilter("Active")
    }
    const changeFilterCompleted = () => {
        props.changeFilter("Completed")
    }
    return (
        <div className="Todolist">
            <div>
                <h3>{props.title}</h3>
                <Input callBack={(newTitle: string) => props.addTask(newTitle)}/>
                <ul>
                    {props.tasks.map((task) => {
                        const removeTaskHandler = () => {
                            props.removeTasks(task.id)
                        }
                        return (
                            <li key={task.id}>
                                <Button callBack={removeTaskHandler} value="X"/>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <Button callBack={changeFilterAll} value={'All'}/>
                    <Button callBack={changeFilterActive} value={'Active'}/>
                    <Button callBack={changeFilterCompleted} value={'Completed'}/>
                </div>
            </div>
        </div>
    );
}

export default Todolist;
