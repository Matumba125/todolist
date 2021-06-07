import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import { v1 } from 'uuid';

export type keyType = "All" | "Active" | "Completed"

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);


    const addTask =(newTitle: string) =>{
        let newTask ={id: v1(), title: newTitle, isDone: true};
        setTasks([newTask, ...tasks]);
    }

    function removeTasks (id: string) {
        tasks = tasks.filter(f => f.id !== id)
        setTasks([...tasks])
    }

    let [filter, setFilter] = useState<keyType>("All");

    const changeFilter = (key: keyType) => {
        setFilter(key)
    }

    let filterValue = tasks;

    if(filter === "Active"){
        filterValue=tasks.filter(f=>!f.isDone)
    }
    if(filter === "Completed"){
        filterValue=tasks.filter(f=>f.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={filterValue}
                removeTasks={removeTasks}
                addTask={addTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
