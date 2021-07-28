import {v1} from 'uuid';
import {TaskStateType} from "../../trash/App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./TaskReducer";
import {addTodoListAC, removeTodoListAC} from "./TodoListReducer";


let todoListId1: string
let todoListId2: string

let startState: TaskStateType

beforeEach(()=>{
    todoListId1 = v1();
    todoListId2 = v1();

    startState = {
    [todoListId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ],
        [todoListId2]: [
        {id: v1(), title: "Books", isDone: false},
        {id: v1(), title: "Notebook", isDone: true},
        {id: v1(), title: "Ipad", isDone: false},
        {id: v1(), title: "Cam", isDone: true},
    ]

}})

test('correct task should be removed', () => {


    const endState = taskReducer(startState, removeTaskAC(startState[todoListId1][0].id, todoListId1))

    expect(endState[todoListId1].length).toBe(4);
    expect(endState[todoListId1][0].title).toBe('JS');
});

test('correct task should be added', () => {

    let newTaskTitle = "New Task";

    const endState = taskReducer(startState, addTaskAC(newTaskTitle, todoListId1))

    expect(endState[todoListId1].length).toBe(6);
    expect(endState[todoListId1][0].title).toBe(newTaskTitle);
});

test('correct task should change its name', () => {


    let newTaskTitle = "New Task Name";

    const endState = taskReducer(startState, changeTaskTitleAC(startState[todoListId2][2].id, newTaskTitle, todoListId2));

    expect(endState[todoListId2][1].title).toBe("Notebook");
    expect(endState[todoListId2][2].title).toBe(newTaskTitle);
});


test('correct task status should be changed', () => {

    const endState = taskReducer(startState, changeTaskStatusAC(startState[todoListId2][4].id, true, todoListId2));

    expect(endState[todoListId2][2].isDone).toBe(false);
    expect(endState[todoListId2][4].isDone).toBe(true);
});

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC(startState[todoListId2][1].id, false, todoListId2);

    const endState = taskReducer(startState, action)

    expect(endState[todoListId2][0].isDone).toBe(false);
    expect(endState[todoListId2][2].isDone).toBe(false);
});

test('new array should be added when new todolist is added', () => {

    const action = addTodoListAC("new todolist");

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != todoListId1 && k != todoListId2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC(todoListId2);

    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});