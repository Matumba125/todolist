import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {setAppStatusAC,} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";

const initialState: TasksStateType = {}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTasks(todolistId);
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {tasks: res.data.items, todolistId}
    }catch (error) {
       return thunkAPI.rejectWithValue(error)
    }
})

export const removeTaskTC = createAsyncThunk('task/removeTask', async (param: { taskId: string, todolistId: string }, thunkAPI) => {
    try {
        await todolistsAPI.deleteTask(param.todolistId, param.taskId)
        return {taskId: param.taskId, todolistId: param.todolistId}
    }catch (error) {
       return thunkAPI.rejectWithValue(error)
    }
})

export const addTaskTC = createAsyncThunk('task/addTask', async (param: { title: string, todolistId: string }, thunkAPI) => {
    try{
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.createTask(param.todolistId, param.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return {task: res.data.data.item}
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch);
                return thunkAPI.rejectWithValue(res.data.messages)
            }
        } catch (error){
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(error)
        }
})

export const updateTaskTC = createAsyncThunk('task/updateTask', async (param: { taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string }, thunkAPI) => {

    const state = thunkAPI.getState() as AppRootStateType

    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue('error')
    }

    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.domainModel
    }

    try{
        const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
        if (res.data.resultCode === 0) {
            return {taskId: param.taskId, model: param.domainModel, todolistId: param.todolistId}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(res.data.messages)
        }
    }catch(error){
        handleServerNetworkError(error, thunkAPI.dispatch);
        return  thunkAPI.rejectWithValue(error)
    }
})


const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            state[action.payload.todolistId] = state[action.payload.todolistId]
                .map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl) => state[tl.id] = [])
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.task.todoListId] = [action.payload.task, ...state[action.payload.task.todoListId]]
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = state[action.payload.todolistId]
                .map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)
        })
    }
})
export const tasksReducer = slice.reducer
export const {updateTaskAC} = slice.actions
// thunks

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}