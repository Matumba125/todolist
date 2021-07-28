import {TaskStateType, TodolistType} from "../../trash/App";
import {addTodoListAC, todoListReducer} from "./TodoListReducer";
import {taskReducer} from "./TaskReducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodoListsState: Array<TodolistType> = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = taskReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodoLists).toBe(action.todoListID);
});

