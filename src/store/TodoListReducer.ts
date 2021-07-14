import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

const CHANGE_FILTER = 'CHANGE-TODOLIST-FILTER'
const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TITLE = 'CHANGE-TODOLIST-TITLE'

export type TodoListActionType = ReturnType<typeof removeTodoListActionCreator> |
    ReturnType<typeof changeTodoListFilterActionCreator> |
    ReturnType<typeof addTodoListActionCreator> |
    ReturnType<typeof changeTodoListTitleActionCreator>


const todoListReducer = (todoLists: Array<TodolistType>, action: TodoListActionType) => {
    switch (action.type) {
        case REMOVE_TODOLIST :
            return todoLists.filter(tl => tl.id !== action.id)
        case CHANGE_FILTER:
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.value} : tl)
        case ADD_TODOLIST:
            const newTodoList: TodolistType = {
                id: v1(),
                title: action.title,
                filter: "All"
            }
            return [newTodoList, ...todoLists]
        case CHANGE_TITLE:
            return todoLists = todoLists.map(tl => {
                if (tl.id === action.id) {
                    tl.title = action.title
                }
                return tl
            })
        default:
            return todoLists
    }
}

export const changeTodoListFilterActionCreator = (value: FilterValuesType, id: string,) => ({
        type: CHANGE_FILTER,
        value: value,
        id: id
    } as const
)

export const removeTodoListActionCreator = (id: string) => ({
        type: REMOVE_TODOLIST,
        id: id
    } as const
)

export const addTodoListActionCreator = (title: string) => ({
        type: ADD_TODOLIST,
        title: title
    } as const
)

export const changeTodoListTitleActionCreator = (title: string, id: string) => ({
        type: CHANGE_TITLE,
        id: id,
        title: title

    } as const
)

export default todoListReducer;