type initialValuesType = {
    [key: string]: any
}

type cssObject = {
    [key: string]: string
}

type ObjectType = {
    [key: string]: any
}

type FormProps = StyleProps & {
    onSubmitHandler: (currentValues: ObjectType) => void,
    initialValues: ObjectType,
    children?: Array<React.ReactNode>,
    onChangeHandler?: (event: React.ChangeEvent<HTMLFormElement>, currentValues: ObjectType) => void,
    // onLiveErrorFeedback?: (currentValues: ObjectType, context: FormContextType) => void,
    onLiveErrorFeedback?: (fn: fieldValidationFunction) => void,
    onValidationHandler?: (values: ObjectType) => string[] | undefined,
    submitButtonText?: string
}

type fieldValidationFunction = (fieldName: string) =>  FieldValidatorInterface  

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
    render?: Function,
    liveUpdate?: Function
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
    children?: React.ReactNode,
    type?: 'button' | 'submit' | 'reset',
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
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
    fieldRefs: RefsObject<GenericHTMLInput | null>,
    errorRefs: RefsObject<HTMLSpanElement | null>,
    initialValues: ObjectType,
    currentValues: ObjectType
}

type setFieldErrorFunction = (fieldName: string, errorMessage: string) => void
type clearFieldErrorFunction = (fieldName: string) => void

interface FieldValidatorInterface {
    field: any
    fieldName: string
    setFieldError: setFieldErrorFunction,
    clearFieldError: clearFieldErrorFunction,
    errorHasBeenSet: boolean
}