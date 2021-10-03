import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './app-reducer'
import {authReducer} from "../features/Login/authReducer";
import {configureStore} from "@reduxjs/toolkit";
import { todoListsReducer } from '../features/TodolistsList/todolists-reducer';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().prepend(thunkMiddleware),
})
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
