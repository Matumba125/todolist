import {v1} from 'uuid';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, removeTodoListAC, todoListReducer
} from "./TodoListReducer";
import {FilterValuesType, TodolistType} from "../../trash/App";

let todolistId1: string
let todolistId2: string

let startState: Array<TodolistType>

beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todoListReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todoListReducer(startState, changeTodoListTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "Completed";

    const endState = todoListReducer(startState, changeTodoListFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});


