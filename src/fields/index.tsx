import React, { useRef, useContext } from 'react';
import { FormContext, FormContextType, GenericHTMLInput } from '../Forminho';

const getStyleForLabel = (type: string | undefined) => {
    const inlineDisplay = ['radio', 'checkbox', 'select'];

    return {
        fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
        display: inlineDisplay.indexOf(type || '') >= 0 ? 'inline-block' : 'block',
        margin: '0 0 .28571429rem 0',
        color: 'rgba(0,0,0,.87)',
        fontSize: '.8em',
        fontWeight: 700,
        marginRight: inlineDisplay.indexOf(type || '') >= 0 ? '0.25em' : '0'
    };
};

const defaultInputStyle = {
    fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
    margin: 0,
    outline: 0,
    lineHeight: '1.21428571em',
    padding: '.67857143em 1em',
    fontSize: '0.8em',
    background: '#fff',
    border: '1px solid rgba(34,36,38,.15)',
    color: 'rgba(0,0,0,.87)',
    borderRadius: '.28571429rem',
    // width: '100%'
}

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

const Field = ({name, type, label, placeholder, style, children, onChange, value}: FieldProps) => {
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
        if (fieldRefs && errorRefs) {
            fieldRefs[name] = inputRef;
            errorRefs[name] = errorRef;
            console.log('Refs Appended ', fieldRefs, errorRefs);
        } else {
            console.log('Refs NOT Appended ', fieldRefs, errorRefs);
        }
    };
    appendRefs();

    const DOMProps = {
        name,
        value,
        placeholder,
        style: {...defaultInputStyle, ...style},
        onChange,
        id: name,
        defaultValue: initialValues ? initialValues[name]: undefined,
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
            {label && <label htmlFor={`${name}-input`} style={getStyleForLabel(type)}>{label}</label>}
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