import React from 'react';

type FieldProps = {
    name: string,
    ref: any,
    type?: string,
    label?: string,
    placeholder?: string,
    style?: cssObject,
    children: Array<React.ReactElement>
};

const InputField = ({name, ref, type, label, placeholder, style, children}: FieldProps) => {
    // const element = 
    
    return (
        <div>
            {label && <label htmlFor={`${name}-input`}>{label}</label>}
            <input
                ref={ref}
                type={type}
                name={name}
                id={name}
                aria-describedby={`${name}-help`}
                aria-label={name}
                placeholder={placeholder}
                style={style}
            >
                {children}
            </input>
        </div>
    );
};


export default InputField;