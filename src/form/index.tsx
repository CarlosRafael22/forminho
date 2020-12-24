import React, { useState } from 'react';
import Button from '../button';
import Alert from '../alert';
import Radio from '../fields/radio';
import Checkbox from '../fields/checkbox';


const useValuesHandler = ({initialValues, onSubmitHandler, onValidationHandler}: FormHandlerHookType): FormHandlerHookReturn => {
    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState(undefined);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log('CHANGE')
        // console.log(event.target)
        // console.log(event.target.value)
        // console.log(event.target.name)
        // Special case for Checkbox
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setValues({
            ...values,
            [event.target.name]: value
        });
    };

    const validatedValues = () => {
        try {
            if (onValidationHandler) onValidationHandler(values);
            setError(undefined);
            return true;
        } catch (error) {
            setError(error.message);
            return false;
        }
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        // console.log('SUBMIT')
        // console.log(event)
        // console.log(event.target)
        // console.log(event.target.elements)
        // console.log(event.target.elements.email)
        if (validatedValues()) {
            onSubmitHandler(values);
        }        
    }

    return {
        values,
        onChangeHandler,
        submitHandler,
        error
    };
};


const Form = ({initialValues, onSubmitHandler, onValidationHandler, children, submitButtonText}: FormProps) => {
    const formHandler = useValuesHandler({initialValues, onSubmitHandler, onValidationHandler});

    let ButtonToRender: React.ReactElement<any>;

    const childrenWithFormProps = React.Children.map(children, (child: React.ReactElement<any>) => {
        if (React.isValidElement(child)) {
            console.log('CHILD')
            // const { type } = child;
            console.log(child.type)
            if (child.type === Button) {
                ButtonToRender = child;
                return null;
            }
            console.log(child.type === Button)

            // console.log(child.type.displayName)
            // child.props.name gives Object of type 'unknown' error since we dont know what the the props are
            // This error doesnt let the project build, to fix this we need to use Type Assertion
            // A workaround to use Type Assertion on destructing is as follow:
            // https://github.com/microsoft/TypeScript/issues/18229
            const { props } = child as { props: InputFieldProps};
            const propName = props.name;
            // const { name } = child.props;

            if (child.type === Radio) {
                const newChild = React.cloneElement(child, {
                    onChange: formHandler.onChangeHandler,
                    stateValue: formHandler.values[propName]
                } as Partial<InputFieldProps> );
                return newChild;
            }

            if (child.type === Checkbox) {
                const newChild = React.cloneElement(child, {
                    onChange: formHandler.onChangeHandler,
                    stateValue: formHandler.values[propName]
                } as Partial<InputFieldProps> );
                return newChild;
            }

            const newChild = React.cloneElement(child, {
                onChange: formHandler.onChangeHandler,
                value: formHandler.values[propName]
            } as Partial<InputFieldProps> );
            return newChild;
        } else {
            return null;
        }
    });

    const renderButton = () => {
        if(ButtonToRender) {
            console.log('TEM BUTTONRENDER')
            return (ButtonToRender)
        } else {
            console.log('NAO TEM BUTTON')
            const button = submitButtonText ? <Button text={submitButtonText} /> : <Button />;
            return button;
        }
    };

    return (
        <form className="main-form" onSubmit={formHandler.submitHandler}>
            {formHandler.error && <Alert text={formHandler.error} />}
            {childrenWithFormProps}
            {renderButton()}
        </form>
    )
};

export default Form;