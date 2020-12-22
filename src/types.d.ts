type initialValuesType = {
    [key: string]: any
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
    children: Array<React.ReactElement>
}

type InputFieldProps = {
    type: string,
    name: string,
    placeholder?: string,
    value?: string,
    onChange?: (event: React.ChangeEvent) => void,
    label?: string
};

type ButtonProps = {
    text?: string,
    style?: { [key: string]: string }
};

type AlertProps = {
    text: string,
    style?: { [key: string]: string }
};