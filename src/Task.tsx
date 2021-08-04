import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {CheckCircleRounded, DeleteRounded} from "@material-ui/icons";
import {EditableSpan} from "./EditableSpan";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/TaskReducer";
import {useDispatch} from "react-redux";
import {TaskType} from "./AppWithRedux";

type TaskPropsType = {
    todoListID: string
    tasks: TaskType
}

export const Task = React.memo(function ({tasks, todoListID, ...restProps}: TaskPropsType) {

    const dispatch = useDispatch();

    const removeTask = useCallback(function (taskID: string, todoListID: string) {
        dispatch(removeTaskAC(taskID, todoListID));
    }, [dispatch])

    const changeTaskStatus = useCallback(function (taskID: string, isDone: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID));
    }, [dispatch])

    const changeTaskTitle = useCallback(function (taskID: string, title: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskID, title, todoListID));
    }, [dispatch])

    return <div>
        <Checkbox
            size={'small'}
            color={'primary'}
            checked={tasks.isDone}
            onChange={(e) => changeTaskStatus(tasks.id, e.currentTarget.checked, todoListID)}
            icon={<CheckCircleRounded/>}
            checkedIcon={<CheckCircleRounded/>}
        />
        <span className={tasks.isDone ? 'isDone' : ''}>
                        <EditableSpan title={tasks.title}
                                      onChange={() => changeTaskTitle(tasks.id, tasks.title, todoListID)}/>
                        </span>
        <IconButton size={'small'} onClick={() => removeTask(tasks.id, todoListID)}>
            <DeleteRounded fontSize={"small"}/>
        </IconButton>
    </div>
})