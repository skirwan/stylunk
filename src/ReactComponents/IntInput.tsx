import { ReactElement, KeyboardEvent, SyntheticEvent, useRef, useEffect } from "react";

interface IntInputParams {
    value: number,
    onChange: (newValue: number) => void;
}

export const IntInput = ({ onChange, value }: IntInputParams): ReactElement => {
    let elementRef = useRef<HTMLInputElement>(null);
    useEffect(()=> {
        elementRef.current!.value = value.toString();
    }, [value]);

    const changeHandler = (evt: SyntheticEvent<HTMLInputElement>) => {
        let newValue = parseInt((evt.target as HTMLInputElement).value, 10);

        if (isNaN(newValue)) { return }
        if (newValue === value) { return }
        onChange(newValue);
    };

    const blurHandler = (evt: SyntheticEvent<HTMLInputElement>) => {
        (evt.target as HTMLInputElement).value = value?.toString();
    };

    const keyPressHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
        let newValue = value;
        if (evt.code === 'ArrowUp') {
            newValue += 1;
        } else if (evt.code === 'ArrowDown') {
            newValue -= 1;
        } else {
            return;
        }

        onChange(newValue);
        //(evt.target as HTMLInputElement).value = newValue.toString();
        evt.preventDefault();
        evt.stopPropagation();
    };

    return <input defaultValue={value} onChange={changeHandler} onBlur={blurHandler} onKeyUp={keyPressHandler} ref={elementRef} />
};