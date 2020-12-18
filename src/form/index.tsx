import React, { useState } from 'react';

export type initialValuesType = {
    [key: string]: any
}

type FormHandlerHookType = {
    initialValues: initialValuesType,
    onSubmitHandler: Function
}

const useValuesHandler = ({initialValues, onSubmitHandler}: FormHandlerHookType) => {
    const [values, setValues] = useState(initialValues);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('CHANGE')
        console.log(event.target)
        console.log(event.target.value)
        console.log(event.target.name)
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('SUBMIT')
        console.log(event)
        console.log(event.target)
        console.log(event.target.elements)
        console.log(event.target.elements.email)
        onSubmitHandler(values);
    }

    return {
        values,
        onChangeHandler,
        submitHandler
    };
}

interface FormProps extends FormHandlerHookType {
    children: Array<React.ReactElement>
}

const Form = ({initialValues, onSubmitHandler, children}: FormProps) => {
    const formHandler = useValuesHandler({initialValues, onSubmitHandler});

    const childrenWithFormProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            console.log('CHILD')
            console.log(child.props)
            const propName = child.props.name;
            const newChild = React.cloneElement(child, {
                onChange: formHandler.onChangeHandler,
                value: formHandler.values[propName]});
            console.log(newChild.props)
            return newChild;
        };
    })

    return (
        <form className="main-form" onSubmit={formHandler.submitHandler}>
            {childrenWithFormProps}
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
};

export default Form;