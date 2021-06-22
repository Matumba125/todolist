import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

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

    const [todoLists, setTodoLists] = useState<Array<TodolistPropsType>>([
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
        tasks[todoListID] = tasks[todoListID].filter(t => t.id != taskID);
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

    const todoListsComponents = todoLists.map(tl => {
       let tasksForTodoList = tasks[tl.id];

       if (tl.filter === 'Active'){
           tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
       }
       if(tl.filter === 'Completed'){
           tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
       }

        return (
            <Todolist
                key= {tl.id}
                todoListID= {tl.id}
                title= {tl.title}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                todoListFilter= {tl.filter}
            />
        )
    })

    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
