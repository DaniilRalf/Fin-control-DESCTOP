import {ChangeEvent, KeyboardEventHandler} from "react";

export const onlyNumber = (e: ChangeEvent<HTMLInputElement> | any): void => {
    const pattern = /^[0-9\b]+$/
    if (!pattern.test(e.key)) {
        e.preventDefault()
    }
}
