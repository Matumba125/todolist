import React, {ChangeEvent, useState} from "react";
import {InputAdornment, TextField} from "@material-ui/core";
import {TextFormatRounded} from "@material-ui/icons";

type  EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)

    const [title, setTitle] = useState(props.title)


    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    function activateEditMode() {
        setEditMode(true)
        setTitle(props.title)
    }


    function activateViewMode() {
        setEditMode(false)
        props.onChange(title)
    }

    return (editMode ?
            <TextField
                size={'small'}
                variant="outlined"
                value={title}
                onChange={changeTitle}
                autoFocus
                onBlur={activateViewMode}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <TextFormatRounded/>
                        </InputAdornment>
                    ),
                }}
            /> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>

    )
}