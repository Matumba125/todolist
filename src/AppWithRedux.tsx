import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/TaskReducer";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./store/TodoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type FilterValuesType = "All" | "Active" | "Completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch();

    //////

    function removeTask(taskID: string, todoListID: string) {
        dispatch(removeTaskAC(taskID, todoListID));
    }

    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID));
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID));
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskID, title, todoListID));
    }

    /////

    function changeTodoListFilter(value: FilterValuesType, todoListID: string) {
        dispatch(changeTodoListFilterAC(value, todoListID))
    }

    function removeTodoList(todoListID: string) {
        const action = removeTodoListAC(todoListID)
        dispatch(action)
    }

    function addTodoList(title: string) {
        let action = addTodoListAC(title)
        dispatch(action)
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatch(changeTodoListTitleAC(title, todoListID));
    }


    const todoListsComponents = todolists.map(tl => {
        let tasksForTodoList = tasks[tl.id];

        if (tl.filter === 'Active') {
            tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === 'Completed') {
            tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
        }

        return <Grid item key={tl.id}>
            <Paper style={{padding: "10px"}}>
                <Todolist
                    todoListID={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeTodoListFilter={changeTodoListFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodoList={removeTodoList}
                    todoListFilter={tl.filter}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                />
            </Paper>
        </Grid>
    })

    return (
        <div className={"App"}>
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button variant={"outlined"} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
