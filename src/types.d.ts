type initialValuesType = {
    [key: string]: any
}

type cssObject = {
    [key: string]: string
}

type FormHandlerHookType = {
    initialValues: initialValuesType,
    onSubmitHandler: Function,
    onValidationHandler?: (values: initialValuesType) => void
}

type FormHandlerHookReturn = {
    values: initialValuesType,
    onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    submitHandler: (event: React.FormEvent) => void,
    error?: string
}

interface FormProps extends FormHandlerHookType {
    children: Array<React.ReactElement>,
    submitButtonText?: string
}

type InputFieldProps = {
    type: string,
    name: string,
    value: string,
    placeholder?: string,
    onChange?: (event: React.ChangeEvent) => void,
    label?: string,
    style?: cssObject
};

type ButtonProps = {
    text?: string,
    style?: cssObject
};

type AlertProps = {
    text: string,
    style?: cssObject
};

type SelectProps = {
    name: string,
    value: string,
    onChange: (event: React.ChangeEvent) => void,
    children: Array<any>,
    label?: string,
    style?: cssObject
};

type TextAreaProps = {
    name: string,
    value: string,
    onChange: (event: React.ChangeEvent) => void,
    placeholder?: string,
    label?: string,
    style?: cssObject
};