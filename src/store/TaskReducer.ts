import {TaskStateType} from "../../trash/App";
import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC} from "./TodoListReducer";

const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const ADD_TODOLIST = 'ADD-TODOLIST'
const REMOVE_TODOLIST = 'REMOVE-TODOLIST'



export type TaskActionType = ReturnType<typeof removeTaskAC>|
    ReturnType<typeof addTaskAC>|
    ReturnType<typeof changeTaskStatusAC>|
    ReturnType<typeof changeTaskTitleAC>|
    ReturnType<typeof addTodoListAC>|
    ReturnType<typeof removeTodoListAC>

const initialState: TaskStateType = {};

export const taskReducer = (state= initialState, action: TaskActionType): TaskStateType => {
    switch (action.type) {
        case REMOVE_TASK :
            return {...state,
                [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID)}
        case ADD_TASK:
            return {...state, [action.todoListID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListID]]}
        case CHANGE_TASK_STATUS:
            return {...state,
                [action.todoListID]: state[action.todoListID].map(m => m.id === action.taskID ? {...m, isDone: action.isDone}: {...m})}
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                   [action.todoListID]: state[action.todoListID].map(m => m.id === action.taskID ? {...m, title: action.title}: {...m}) }
        case  ADD_TODOLIST:
            return  {
                ...state,
                [action.todoListID]: []
            }
        case  REMOVE_TODOLIST:
            const stateCopy = {...state}
            delete stateCopy[action.todoListID]
            return stateCopy
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todoListID: string) => ({
        type: REMOVE_TASK,
        taskID,
        todoListID
    } as const
)

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string) => ({
        type: CHANGE_TASK_STATUS,
        taskID,
        isDone,
        todoListID
    } as const
)

export const addTaskAC = (title: string, todoListID: string) => ({
        type: ADD_TASK,
        title,
        todoListID
    } as const
)

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string) => ({
        type: CHANGE_TASK_TITLE,
        taskID,
        title,
        todoListID

    } as const
)

