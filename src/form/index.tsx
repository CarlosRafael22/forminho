import React, { useState } from 'react';

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
        // console.log(event.target.elements)
        // console.log(event.target.elements.email)
        onSubmitHandler(values);
    }

    return {
        values,
        onChangeHandler,
        submitHandler
    };
}

const Form = ({initialValues, onSubmitHandler, children}: FormProps) => {
    const formHandler = useValuesHandler({initialValues, onSubmitHandler});

    const childrenWithFormProps = React.Children.map(children, (child: React.ReactElement<any>) => {
        if (React.isValidElement(child)) {
            console.log('CHILD')
            console.log(child.props)
            // child.props.name gives Object of type 'unknown' error since we dont know what the the props are
            // This error doesnt let the project build, to fix this we need to use Type Assertion
            // A workaround to use Type Assertion on destructing is as follow:
            // https://github.com/microsoft/TypeScript/issues/18229
            const { props } = child as { props: InputFieldProps};
            const propName = props.name;
            // const { name } = child.props;
            const newChild = React.cloneElement(child, {
                onChange: formHandler.onChangeHandler,
                value: formHandler.values[propName]
            } as Partial<InputFieldProps> );
            console.log(newChild.props)
            return newChild;
        } else {
            return null;
        }
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