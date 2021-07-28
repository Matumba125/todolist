import {FilterValuesType, TodolistType} from "../../trash/App";
import {v1} from "uuid";

const CHANGE_FILTER = 'CHANGE-TODOLIST-FILTER'
const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TITLE = 'CHANGE-TODOLIST-TITLE'

export type TodoListActionType = ReturnType<typeof removeTodoListAC> |
    ReturnType<typeof changeTodoListFilterAC> |
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof changeTodoListTitleAC>

const initialState: Array<TodolistType> = [];


export const todoListReducer = (state = initialState, action: TodoListActionType): Array<TodolistType> => {
    switch (action.type) {
        case REMOVE_TODOLIST :
            return state.filter(tl => tl.id !== action.todoListID)
        case CHANGE_FILTER:
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.value} : {...tl})
        case ADD_TODOLIST:
            return [{id: action.todoListID, title: action.title, filter: "All"}, ...state]
        case CHANGE_TITLE:
            return state.map(tl => tl.id === action.toddListID ? {...tl, title: action.title} : {...tl})
        default:
            return state
    }
}

export const changeTodoListFilterAC = (value: FilterValuesType, id: string,) => ({
        type: CHANGE_FILTER,
        value: value,
        id: id
    } as const
)

export const removeTodoListAC = (todoListID: string) => ({
        type: REMOVE_TODOLIST,
        todoListID
    } as const
)

export const addTodoListAC = (title: string) => ({
        type: ADD_TODOLIST,
        title,
        todoListID: v1()
    } as const
)

export const changeTodoListTitleAC = (title: string, toddListID: string) => ({
        type: CHANGE_TITLE,
        toddListID,
        title

    } as const
)

