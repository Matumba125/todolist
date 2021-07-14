import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import { CheckCircleRounded, DeleteRounded} from "@material-ui/icons";

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

    const addTask = (title: string) => {
        props.addTask(title, props.todoListID);
    }

    const onFilterClickHandler = (filterValue: FilterValuesType) => {
        return () => props.changeTodoListFilter(filterValue, props.todoListID);
    }

    const onClickRemoveTodoList = () => props.removeTodoList(props.todoListID)

    const onChangeTitleHandler = (newValue: string) => {
        props.changeTodoListTitle(newValue, props.todoListID)
    }

    return <div>
        <h3 style={{textAlign: "center"}}>
            <EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div style={{listStyle: "none", paddingLeft: "0px" }}>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.todoListID)
                    const isDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, event.currentTarget.checked, props.todoListID)
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.todoListID)
                    }


                    return <div key={t.id}>
                        <Checkbox
                            size={'small'}
                            color={'primary'}
                            checked={t.isDone}
                            onChange={isDoneHandler}
                            icon={<CheckCircleRounded />}
                            checkedIcon={<CheckCircleRounded />}
                        />
                        <span className={t.isDone ? 'isDone' : ''}>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        </span>
                        <IconButton size={'small'} onClick={onClickHandler}>
                            <DeleteRounded fontSize={"small"}/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <ButtonGroup variant="text" aria-label="text primary button group">
            <Button
                size="small"
                style={{margin: "3px"}}
                color={props.todoListFilter === 'All' ? 'secondary' : 'primary'}
                onClick={onFilterClickHandler("All")}>
                All
            </Button>
            <Button
                size="small"
                style={{margin: "3px"}}
                color={props.todoListFilter === 'Active' ? 'secondary' : 'primary'}
                onClick={onFilterClickHandler("Active")}>
                Active
            </Button>
            <Button
                size="small"
                style={{margin: "3px"}}
                color={props.todoListFilter === 'Completed' ? 'secondary' : 'primary'}
                onClick={onFilterClickHandler("Completed")}>
                Completed
            </Button>
        </ButtonGroup>
            <IconButton style={{margin: "10px 0 0 45px"}} size={'small'} onClick={onClickRemoveTodoList}>
                <DeleteRounded color={'primary'}/>
            </IconButton>

    </div>
}



