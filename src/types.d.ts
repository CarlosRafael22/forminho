type initialValuesType = {
    [key: string]: any
}

type cssObject = {
    [key: string]: string
}

type ObjectType = {
    [key: string]: any
}

// type FormHandlerHookType = {
//     initialValues: initialValuesType,
//     onSubmitHandler: Function,
//     onValidationHandler?: (values: initialValuesType) => void
// }

// type FormHandlerHookReturn = {
//     values: initialValuesType,
//     onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
//     submitHandler: (event: React.FormEvent) => void,
//     error?: string
// }

interface FormProps {
    onSubmitHandler: (currentValues: ObjectType) => void,
    initialValues: ObjectType,
    children?: Array<React.ReactElement>,
    onChangeHandler?: (event: React.ChangeEvent<HTMLFormElement>, currentValues: ObjectType) => void,
    onLiveErrorFeedback?: (currentValues: ObjectType, context: FormContextType) => void,
    onValidationHandler?: (values: ObjectType) => void,
    submitButtonText?: string
}

type GenericInputChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>;

type StyleProps = {
    style?: Object,
    css?: string,
    className?: string
}

type FieldProps = StyleProps & {
    name: string,
    type?: string,
    value?: string,
    label?: string,
    placeholder?: string,
    options?: Array<string>,
    children?: Array<React.ReactNode>,
    onChange?: (event: GenericInputChangeEvent) => void,
    error?: string,
    render?: Function
};

type LiveValueProps = {
    fieldName: string
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

type ButtonProps = StyleProps & {
    text?: string,
    children?: Array<React.ReactNode>
};

type AlertProps = {
    text: string,
    style?: cssObject
};

type SelectProps = {
    type: 'select',
    name: string,
    value: string,
    onChange: (event: React.ChangeEvent) => void,
    children: Array<any>,
    label?: string,
    style?: cssObject
};

type TextAreaProps = {
    type: 'textarea',
    name: string,
    value: string,
    onChange: (event: React.ChangeEvent) => void,
    placeholder?: string,
    label?: string,
    style?: cssObject
};

type RadioProps = {
    type: 'radio',
    name: string,
    value: string,
    label: string,
    onChange: (event: React.ChangeEvent) => void,
    stateValue?: string,
    style?: cssObject
};

type CheckboxProps = {
    type: 'checkbox',
    name: string,
    label: string,
    onChange: (event: React.ChangeEvent) => void,
    stateValue?: boolean,
    style?: cssObject
};

// type FieldProps = InputFieldProps | SelectProps | TextAreaProps | RadioProps | CheckboxProps;
type ComponentProps = FieldProps | ButtonProps | AlertProps;

type GenericHTMLInput = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type RefsObject<T> = {
    [key: string]: React.MutableRefObject<T>
}

type FormContextType = {
    formRef: React.MutableRefObject<HTMLFormElement | null>,
    liveValuesRefs: { [key: string]: Array<HTMLSpanElement>},
    fieldRefs: RefsObject<GenericHTMLInput | null>,
    errorRefs: RefsObject<HTMLSpanElement | null>,
    initialValues: ObjectType,
    currentValues: ObjectType
}