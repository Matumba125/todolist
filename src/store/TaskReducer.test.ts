import {v1} from 'uuid';;
import {TaskStateType} from "../App";
import taskReducer, {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./TaskReducer";
import {addTodoListAC, removeTodoListAC} from "./TodoListReducer";


const todoListId_1 = v1()
const todoListId_2 = v1()

let startState: TaskStateType

beforeEach(()=>{
    startState = {
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

}})

test('correct task should be removed', () => {


    const endState = taskReducer(startState, removeTaskAC(startState[todoListId_1][0].id, todoListId_1))

    expect(endState[todoListId_1].length).toBe(4);
    expect(endState[todoListId_1][0].title).toBe('JS');
});

test('correct task should be added', () => {

    let newTaskTitle = "New Task";

    const endState = taskReducer(startState, addTaskAC(newTaskTitle, todoListId_1))

    expect(endState[todoListId_1].length).toBe(6);
    expect(endState[todoListId_1][0].title).toBe(newTaskTitle);
});

test('correct task should change its name', () => {


    let newTaskTitle = "New Task Name";

    const endState = taskReducer(startState, changeTaskTitleAC(startState[todoListId_2][2].id, newTaskTitle, todoListId_2));

    expect(endState[todoListId_2][1].title).toBe("Notebook");
    expect(endState[todoListId_2][2].title).toBe(newTaskTitle);
});


test('correct task status should be changed', () => {

    const endState = taskReducer(startState, changeTaskStatusAC(startState[todoListId_2][4].id, true, todoListId_2));

    expect(endState[todoListId_2][2].isDone).toBe(false);
    expect(endState[todoListId_2][4].isDone).toBe(true);
});

test('status of specified task should be changed', () => {
    const newState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = changeTaskStatusAC("2", false, "todolistId2");

    const endState = taskReducer(newState, action)

    expect(newState["todolistId2"][0].isDone).toBe(false);
    expect(newState["todolistId2"][2].isDone).toBe(false);
});

test('new array should be added when new todolist is added', () => {
    const newState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = addTodoListAC("new todolist");

    const endState = taskReducer(newState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = removeTodoListAC("todolistId2");

    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});