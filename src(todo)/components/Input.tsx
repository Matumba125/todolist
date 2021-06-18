import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type InputPropsType = {
    callBack: (newTitle: string) => void
}


function Input(props: InputPropsType) {
    let [title, setTitle] = useState('')
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)

    }
    const onClickHandler = () => {
        props.callBack(title);
        setTitle('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter"){
            onClickHandler()
        }
    }
    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}>+</button>
        </div>
    );
};

export default Input;