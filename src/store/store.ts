import {combineReducers, createStore} from "redux";
import {todoListReducer} from "./TodoListReducer";
import {taskReducer} from "./TaskReducer";


export const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todoListReducer,
});

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

