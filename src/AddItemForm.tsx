import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType ={
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType){

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

    return(
        <div>
            <input value={title}
                   className={error ? 'error' : ''}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={error ? 'errorMessage' : ''}>{error}</div>}
        </div>

    )
}

export default AddItemForm