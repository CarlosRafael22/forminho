type initialValuesType = {
    [key: string]: any
}

type FormHandlerHookType = {
    initialValues: initialValuesType,
    onSubmitHandler: Function
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