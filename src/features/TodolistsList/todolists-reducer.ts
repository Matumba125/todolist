import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

export const fetchTodoListsTC = createAsyncThunk('todoLists/fetchTodoLists', async (param, {
    dispatch,
    rejectWithValue
}) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.getTodolists()
        return {todoLists: res.data}
    } catch (error) {
        return rejectWithValue(error)
    } finally {
        dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})

export const removeTodolistTC = createAsyncThunk('todoLists/removeTodoList', async (todoListId: string, {
    dispatch,
    rejectWithValue
}) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({id: todoListId, status: 'loading'}))
        await todolistsAPI.deleteTodolist(todoListId)
        return {id: todoListId}
    } catch (error) {
        return rejectWithValue(error)
    } finally {
        dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})

export const addTodolistTC = createAsyncThunk('todoLists/addTodoList', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.createTodolist(title)
        return {todolist: res.data.data.item}
    } catch (error) {
        return rejectWithValue(error)
    } finally {
        dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})
export const changeTodolistTitleTC = createAsyncThunk('todoLists/changeTodoListTitle', async (param:{id: string, title: string}, {
    dispatch,
    rejectWithValue
}) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.updateTodolist(param.id, param.title)
        return {id: param.id, title: param.title}
    } catch (error) {
        return rejectWithValue(error)
    } finally {
        dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})


const slice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            return state.filter(tl => tl.id !== action.payload.id)
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
    }
})
export const todoListsReducer = slice.reducer
// actions
export const {
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
} = slice.actions
// thunks

// types

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
