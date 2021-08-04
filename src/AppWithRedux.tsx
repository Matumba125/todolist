import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC} from "./store/TaskReducer";
import {addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from "./store/TodoListReducer";
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

    ////// task functions


    const addTask = useCallback(function (title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID));
    }, [dispatch])


    /////  todolist functions

    const changeTodoListFilter = useCallback(function (value: FilterValuesType, todoListID: string) {
        dispatch(changeTodoListFilterAC(value, todoListID))
    }, [dispatch])

    const removeTodoList = useCallback(function (todoListID: string) {
        const action = removeTodoListAC(todoListID)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback(function (title: string) {
        let action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback(function (title: string, todoListID: string) {
        dispatch(changeTodoListTitleAC(title, todoListID));
    }, [dispatch])

    ///// set filter

    const todoListsComponents = todolists.map(tl => {

        return <Grid item key={tl.id}>
            <Paper style={{padding: "10px"}}>
                <Todolist
                    todoListID={tl.id}
                    title={tl.title}
                    tasks={tasks[tl.id]}
                    changeTodoListFilter={changeTodoListFilter}
                    addTaskCallback={addTask}
                    removeTodoList={removeTodoList}
                    filter={tl.filter}
                    changeTodoListTitle={changeTodoListTitle}
                />
            </Paper>
        </Grid>
    })

    ///// main return

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
