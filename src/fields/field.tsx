import React, { useRef, useContext } from 'react';
import { FormContext, FormContextType, GenericHTMLInput } from '../Forminho';

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

// interface FieldComponent extends React.ForwardRefExoticComponent<FieldProps & React.RefAttributes<HTMLElement>> {
//     Input: React.ForwardRefExoticComponent<any & React.RefAttributes<HTMLElement>>;
//     Select: React.ForwardRefExoticComponent<any & React.RefAttributes<HTMLElement>>;
//     TextArea: React.ForwardRefExoticComponent<any & React.RefAttributes<HTMLElement>>;
// };

// type GenericHTMLInputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const Field = ({name, type, label, placeholder, style, children, onChange, value}: FieldProps) => {
    // const element = 
    // console.log('Input ', ref)
    const inputRef = useRef<GenericHTMLInput>(null);
    const errorRef = useRef<HTMLSpanElement>(null);
    const { fieldRefs, errorRefs, initialValues } = useContext(FormContext) as FormContextType;
    console.log('CONTEXT NO INPUT ---- ', fieldRefs, errorRefs)
    // const errorRef = React.useCallback(node => {
    //     if(node !== null) {
    //         console.log(node);
    //     }
    //     return node;
    // }, []);

    // const { name: propName } = props;
    // const refFunction = (input) => formContext.refs[name] = inputRef;
    const appendRefs = () => {
        fieldRefs[name] = inputRef;
        errorRefs[name] = errorRef;
        console.log('Refs Appended ', fieldRefs, errorRefs);
    };
    appendRefs();

    const DOMProps = {
        name,
        value,
        placeholder,
        style,
        onChange,
        id: name,
        defaultValue: initialValues[name],
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
            {element()}
            <span ref={errorRef} style={{color: "red"}} />
        </div>
    );
};


const ExportField = {
    Input: (props: FieldProps) => Field(props),
    Select: (props: FieldProps) => Field({...props, type: 'select'}),
    TextArea: (props: FieldProps) => Field({...props, type: 'textarea'}),
    Radio: (props: FieldProps) => Field({...props, type: 'radio'}),
    Checkbox: (props: FieldProps) => Field({...props, type: 'checkbox'})
};


export default ExportField;