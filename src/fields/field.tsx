import React, { useRef, useImperativeHandle, useContext } from 'react';
import { FormContext } from '../form/form';

type GenericInputChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>;

type FieldProps = {
    name: string,
    type?: string,
    label?: string,
    placeholder?: string,
    style?: any,
    children?: Array<React.ReactElement>,
    onChange?: (event: GenericInputChangeEvent) => void,
    value?: string,
    defaultValue?: string,
    error?: string,
    render?: Function
};

export type initialValuesType = {
    [key: string]: any
}

type contextType = {
    inputRefs?: initialValuesType,
    errorRefs?: initialValuesType
};


// interface FieldComponent extends React.ForwardRefExoticComponent<FieldProps & React.RefAttributes<HTMLElement>> {
//     Input: React.ForwardRefExoticComponent<any & React.RefAttributes<HTMLElement>>;
//     Select: React.ForwardRefExoticComponent<any & React.RefAttributes<HTMLElement>>;
//     TextArea: React.ForwardRefExoticComponent<any & React.RefAttributes<HTMLElement>>;
// };

type GenericHTMLInputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
// type GenericFieldHTMLAttributes =
//   | JSX.IntrinsicElements['input']
//   | JSX.IntrinsicElements['select']
//   | JSX.IntrinsicElements['textarea'];

const Field = React.forwardRef(({name, type, label, placeholder, style, children, onChange, value, defaultValue}: FieldProps, ref) => {
    // const element = 
    // console.log('Input ', ref)
    const inputRef = useRef<GenericHTMLInputElement>(null);
    const errorRef = useRef<HTMLSpanElement>(null);
    const { inputRefs, errorRefs }: contextType = useContext(FormContext) as { errorRefs: initialValuesType, inputRefs: initialValuesType };
    console.log('CONTEXT NO INPUT ---- ', inputRefs, errorRefs)
    // const errorRef = React.useCallback(node => {
    //     if(node !== null) {
    //         console.log(node);
    //     }
    //     return node;
    // }, []);

    // const { name: propName } = props;
    // const refFunction = (input) => formContext.refs[name] = inputRef;
    const appendRefs = () => {
        inputRefs[name] = inputRef;
        errorRefs[name] = errorRef;
        console.log('Refs Appended ', inputRefs, errorRefs);
    };
    appendRefs();

    useImperativeHandle(
        ref,
        () => ({
            input: inputRef.current,
            error: errorRef.current
        }),
        [inputRef, errorRef]
    );
    // console.log('REF inside ', ref)


    const DOMProps = {
        name,
        value,
        defaultValue,
        placeholder,
        style,
        onChange,
        id: name,
        'aria-describedby': `${name}-help`,
        'aria-label': name
    };

    const element = () => {
        if (type === 'select') {
            const selectRef = inputRef as React.MutableRefObject<HTMLSelectElement>;
            return (
                <select ref={selectRef} {...DOMProps}>
                    {children}
                </select>
            );
        } else if (type === 'textarea') {
            const textAreaRef = inputRef as React.MutableRefObject<HTMLTextAreaElement>;
            return <textarea ref={textAreaRef} {...DOMProps} />;
        } else {
            const ref = inputRef as React.MutableRefObject<HTMLInputElement>;
            return <input ref={ref} {...{...DOMProps, type}} />;
        }
    };
    
    return (
        <div>
            {label && <label htmlFor={`${name}-input`}>{label}</label>}
            {/* <input
                ref={inputRef}
                {...DOMProps}
            /> */}
            {element()}
            {/* {render(inputRef, DOMProps)} */}
            {/* {children} */}
            <span ref={errorRef} style={{color: "red"}} />
        </div>
    );
});

// const Select = React.forwardRef(({children, ...rest}, ref) => {
//     const renderSelect = ({inputRef, DOMProps}): JSX.Element => (
//         <select ref={inputRef} {...DOMProps}>
//             {children}
//         </select>
//     );
//     const props = {...rest};
//     return (
//         <Field ref={ref} render={renderSelect} {...props} />
//     );
// });

// const Input = React.forwardRef((props, ref) => {
//     const renderInput = ({inputRef, DOMProps}) => (
//         <input ref={inputRef} {...DOMProps} />
//     );

//     return (
//         <Field ref={ref} render={renderInput} {...props} />
//     );
// });

// const TextArea = (props) => {
//     const renderTextArea = ({inputRef, DOMProps}) => (
//         <textarea ref={inputRef} {...DOMProps} />
//     );

//     return (
//         <Field render={renderTextArea} {...props} />
//     );
// };

// Field.Input = Input;
// Field.Select = Select;
// Field.TextArea = TextArea;

// const SelectField = (props) => (
//     <Field render={Select} {...props} />
// );

// const Input = ({inputRef, DOMProps}) => {
//     return (
//         <input ref={inputRef} {...DOMProps} />
//     );
// };

// const TextArea = ({inputRef, DOMProps}) => {
//     return (
//         <textarea ref={inputRef} {...DOMProps} />
//     );
// };

{/* <Input render={Select} ></Input>

const CoreField = (htmlElement, children) => (
    < ref={inputRef} {...DOMProps} />
    {children}
); */}


export default Field;