import React from "react";

type ButtonPropsType = {
    callBack: () => void
    value: string
}

export function Button(props: ButtonPropsType) {
    const onClickHandler =() =>{
        props.callBack()
    }
    return (
        <button onClick={onClickHandler}> {props.value} </button>
    )
}