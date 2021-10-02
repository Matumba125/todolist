import {setAppStatusAC, setIsInitializedAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


export const loginTC = createAsyncThunk('auth/login', async (data: LoginParamsType, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            return {value: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsError: res.data.fieldsError})
        }
    } catch (error) {
        const err: AxiosError = error
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [err.message], fieldErrors: undefined})
    } finally {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    }

})

export const logoutTC = createAsyncThunk('auth/logout', async (param: {}, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({value: false}))
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (error) {
        const err: AxiosError = error
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [err.message], fieldErrors: undefined})
    } finally {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})

export const initializeAppTC = createAsyncThunk('auth/initializeApp', async (param: {}, thunkAPI) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({value: true}));
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsError: res.data.fieldsError})
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(error)
    } finally {
        thunkAPI.dispatch(setIsInitializedAC({isInitialized: true}))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})


const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.value
        })
    }
})
export const authReducer = slice.reducer

const {setIsLoggedInAC} = slice.actions
