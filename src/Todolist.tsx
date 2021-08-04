import React, {useCallback} from 'react';
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import {DeleteRounded} from "@material-ui/icons";
import {Task} from "./Task";
import {FilterValuesType, TaskType} from "./AppWithRedux";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    todoListID: string
    changeTodoListFilter: (value: FilterValuesType, todoListID: string) => void
    addTaskCallback: (title: string, todoListID: string) => void
    changeTodoListTitle: (newValue: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    filter: FilterValuesType
}


export const Todolist = React.memo(function ({
                                                 title, tasks,
                                                 todoListID,
                                                 changeTodoListTitle,
                                                 removeTodoList,
                                                 changeTodoListFilter,
                                                 addTaskCallback, filter
                                             }: PropsType) {

    const addTask = useCallback((title: string) => {
        addTaskCallback(title, todoListID);
    }, [addTaskCallback, todoListID])

    const onFilterClickHandler = useCallback((filterValue: FilterValuesType) => {
        return () => changeTodoListFilter(filterValue, todoListID);
    }, [changeTodoListFilter, todoListID])

    const onClickRemoveTodoList = () => removeTodoList(todoListID)

    const onChangeTitleHandler = useCallback((newValue: string) => {
        changeTodoListTitle(newValue, todoListID)
    }, [changeTodoListTitle, todoListID])

    let tasksForTodoList = tasks

    if (filter === 'Active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === 'Completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    return <div>
        <h3 style={{textAlign: "center"}}>
            <EditableSpan title={title} onChange={onChangeTitleHandler}/>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div style={{listStyle: "none", paddingLeft: "0px"}}>
            {
                tasksForTodoList.map(t => {
                    return <Task
                        todoListID={todoListID}
                        tasks={t}
                        key={t.id}
                    />
                })
            }
        </div>
        <ButtonGroup variant="text" aria-label="text primary button group">
            <Button
                size="small"
                style={{margin: "3px"}}
                color={filter === 'All' ? 'secondary' : 'primary'}
                onClick={onFilterClickHandler("All")}>
                All
            </Button>
            <Button
                size="small"
                style={{margin: "3px"}}
                color={filter === 'Active' ? 'secondary' : 'primary'}
                onClick={onFilterClickHandler("Active")}>
                Active
            </Button>
            <Button
                size="small"
                style={{margin: "3px"}}
                color={filter === 'Completed' ? 'secondary' : 'primary'}
                onClick={onFilterClickHandler("Completed")}>
                Completed
            </Button>
        </ButtonGroup>
        <IconButton style={{margin: "10px 0 0 45px"}} size={'small'} onClick={onClickRemoveTodoList}>
            <DeleteRounded color={'primary'}/>
        </IconButton>

    </div>
})