import React from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import LinearProgress from '@material-ui/core/LinearProgress'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {Menu} from "@material-ui/icons";
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from "@material-ui/core/Container";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./appReducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>

                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' &&
            <LinearProgress color={"secondary"}/>
            }
            <Container fixed>
                <TodolistsList/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App
