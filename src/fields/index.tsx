import React, { useRef, useContext } from 'react';
import { FormContext, FormContextType, GenericHTMLInput } from '../Forminho';

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
        value, // Used for Radio fields and Checkbox fields when there are many with the same name
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

    const getLabel = (): (string | undefined) => {
        // If they have label then it should return otherwise gets the value
        // for when the user wants the value to be the same as label prop
        if (type === 'checkbox' || type === 'radio') {
            if (label) return label
            return value
        }
        return label
    }
    
    return (
        <div style={defaultDivStyle}>
            {getLabel() && <label htmlFor={name} style={getStyleForLabel(type)}>{getLabel()}</label>}
            {element()}
            <span ref={errorRef} style={{color: "red"}} />
        </div>
    );
};


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
};

const defaultDivStyle = {
    marginTop: '0.5rem',
};


const ExportField = {
    Input: (props: FieldProps) => Field(props),
    Select: (props: FieldProps) => Field({...props, type: 'select'}),
    TextArea: (props: FieldProps) => Field({...props, type: 'textarea'}),
    Radio: (props: FieldProps) => Field({...props, type: 'radio'}),
    Checkbox: (props: FieldProps) => Field({...props, type: 'checkbox'})
};


export default ExportField;