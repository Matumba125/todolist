import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "All" | "Active" | "Completed";

function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = { id: v1(), title: title, isDone: false };
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(id: string, isDone: boolean ){
        let currentTask = tasks.find(f => f.id === id)
        if(currentTask){
            currentTask.isDone = isDone
            setTasks([...tasks])
        }
    }

    let [filter, setFilter] = useState<FilterValuesType>("All");

    let tasksForTodolist = tasks;

    if (filter === "Active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "Completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }



    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeCheckbox={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
