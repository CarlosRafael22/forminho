import React, { useRef, useContext, useImperativeHandle } from 'react';
import { FormContext, FormContextType, GenericHTMLInput } from '../Forminho';
import { isArrayOfStrings } from './utils'
import { constructCssStyleAndReturnClassName } from '../utils'

const Field = ({name, type, label, placeholder, style, children, onChange, value, options, css, liveUpdate}: FieldProps, ref?: any) => {
    const inputRef = useRef<GenericHTMLInput>(null);
    const errorRef = useRef<HTMLSpanElement>(null);
    const { fieldRefs, errorRefs, initialValues } = useContext(FormContext) as FormContextType;
    console.log('CONTEXT NO INPUT ---- ', fieldRefs, errorRefs)

    useImperativeHandle(ref, () => ({
        current: inputRef.current
    }))

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

    const onChangeHandler = (event: GenericInputChangeEvent) => {
        // liveUpdate is a callback to update the state of the parent component which wants to have real time updates of this field
        if(liveUpdate) liveUpdate(event.target.value)
        if(onChange) onChange(event)
    }

    const defaultProps = {
        name,
        value, // Used for Radio fields and Checkbox fields when there are many with the same name
        placeholder,
        // style: {...defaultInputStyle, ...style},
        onChange: onChangeHandler,
        id: name,
        defaultValue: initialValues ? initialValues[name]: undefined,
        'aria-describedby': `${name}-help`,
        'aria-label': name
    };

    const getFieldsStyleProps = () => {
        let fieldsProps
        if (css) {
            const className = constructCssStyleAndReturnClassName(css)
            fieldsProps = {
                className: className
            }
        } else {
            fieldsProps = {
                style: {...defaultInputStyle, ...style}
            }
        }
        console.log('FIELD PROOPS ----- ', fieldsProps)
        return fieldsProps
    }

    const styleProps = getFieldsStyleProps()

    const DOMProps = {
        ...defaultProps,
        ...styleProps
    }

    console.log('O DOMPORRRROSP ----- ', DOMProps)

    const element = () => {
        if (type === 'select') {
            const selectRef = inputRef as React.MutableRefObject<HTMLSelectElement>;
            const options = getSelectOptions()
            return (
                <select ref={selectRef} {...DOMProps}>
                    {options}
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

    const getSelectOptions = () => {
        if (isArrayOfStrings(options) && !children) {
            // Received an array with the options values then we should create them
            return options?.map((value, i) => (
                <option value={value} key={i}>{value}</option>
            ))
        } else {
            return children
        }
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

const forwardRef = (props: FieldProps, ref: React.ForwardedRef<GenericHTMLInput>) => Field(props, ref)
const selectForwardRef = (props: FieldProps, ref: React.ForwardedRef<GenericHTMLInput>) => Field({...props, type: 'select'}, ref)
const textareaForwardRef = (props: FieldProps, ref: React.ForwardedRef<GenericHTMLInput>) => Field({...props, type: 'textarea'}, ref)
const radioForwardRef = (props: FieldProps, ref: React.ForwardedRef<GenericHTMLInput>) => Field({...props, type: 'radio'}, ref)
const checkboxForwardRef = (props: FieldProps, ref: React.ForwardedRef<GenericHTMLInput>) => Field({...props, type: 'checkbox'}, ref)

// Used Partial<FieldProps> because it was raising an error 'type ' ' is missing the following properties from type pick<FieldProps>' when using the Fields
const ExportField = {
    Input: React.forwardRef<GenericHTMLInput, Partial<FieldProps>>(forwardRef),
    Select: React.forwardRef<GenericHTMLInput, Partial<FieldProps>>(selectForwardRef),
    TextArea: React.forwardRef<GenericHTMLInput, Partial<FieldProps>>(textareaForwardRef),
    Radio: React.forwardRef<GenericHTMLInput, Partial<FieldProps>>(radioForwardRef),
    Checkbox: React.forwardRef<GenericHTMLInput, Partial<FieldProps>>(checkboxForwardRef)
};

export default ExportField;