import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "All" | "Active" | "Completed";

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodolistPropsType>>([
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
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        tasks[todoListID] = [newTask, ...tasks[todoListID]];
        setTasks({...tasks});
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].map(t => {
            if (t.id === taskID) {
                return {...t, isDone: isDone}
            }
            return t
        })
        setTasks({...tasks});
    }

    function changeTodoListFilter(value: FilterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))

    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]

    }

    function addTodoList(title: string) {
        const newTodoList: TodolistPropsType = {
            id: v1(),
            title: title,
            filter: "All"
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoList.id]: []})
    }

    function changeTaskTitle(id: string, title: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].map(t => {
            if (t.id === id) {
                t.title = title
            }
            return t
        })
        setTasks({...tasks});
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        todoLists = todoLists.map(tl => {
            if (tl.id === todoListID) {
                tl.title = title
            }
            return tl
        })
        setTodoLists([...todoLists]);
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
