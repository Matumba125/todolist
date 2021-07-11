import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import {AddBox, TextFormatRounded} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>('')

    const addItem = () => {
        if (title.trim()) {
            props.addItem(title.trim());
        } else {
            setError('Title is required')
        }
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addItem();
        }
    }

    return (
        <div>
            <TextField
                size={'small'}
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                placeholder="Title"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <TextFormatRounded />
                        </InputAdornment>
                    ),
                }}
                error={!!error}
                helperText={!!error && error}
            />
            <IconButton color="primary" size={'small'} onClick={addItem}>
                <AddBox fontSize={'large'}/>
            </IconButton>
        </div>

    )
}

export default AddItemForm