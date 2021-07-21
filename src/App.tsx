import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import taskReducer, {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/TaskReducer";
import todoListReducer, {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./store/TodoListReducer";

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

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {
            id: todoListId_1,
            title: 'What to learn',
            filter: "All"
        },
        {
            id: todoListId_2,
            title: 'What to buy',
            filter: "All"
        }
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Books", isDone: false},
            {id: v1(), title: "Notebook", isDone: true},
            {id: v1(), title: "Scooter", isDone: false},
            {id: v1(), title: "Car", isDone: true},
            {id: v1(), title: "BTC", isDone: false},
        ]

    })

    //////

    function removeTask(taskID: string, todoListID: string) {
        setTasks(taskReducer(tasks, removeTaskAC(taskID, todoListID)));
    }

    function addTask(title: string, todoListID: string) {
        setTasks(taskReducer(tasks, addTaskAC(title, todoListID)));
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        setTasks(taskReducer(tasks, changeTaskStatusAC(taskID, isDone, todoListID)));
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        setTasks(taskReducer(tasks, changeTaskTitleAC(taskID, title, todoListID)));
    }

    /////

    function changeTodoListFilter(value: FilterValuesType, todoListID: string) {
        setTodoLists(todoListReducer(todoLists, changeTodoListFilterAC(value, todoListID)))
    }

    function removeTodoList(todoListID: string) {
        const action = removeTodoListAC(todoListID)
        setTodoLists(todoListReducer(todoLists, action))
        setTasks(taskReducer(tasks, action))
    }

    function addTodoList(title: string) {
        let action = addTodoListAC(title)
        setTodoLists(todoListReducer(todoLists, action))
        setTasks(taskReducer(tasks, action))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        setTodoLists(todoListReducer(todoLists, changeTodoListTitleAC(title, todoListID)));
    }


    const todoListsComponents = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id];

        if (tl.filter === 'Active') {
            tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
        }
        if (tl.filter === 'Completed') {
            tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
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

export default App;
