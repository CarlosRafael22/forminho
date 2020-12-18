import React, { ChangeEvent } from 'react';

type InputFieldProps = {
    type: string,
    name: string,
    placeholder?: string,
    value?: string,
    onChange?: (event: ChangeEvent) => void
};

const InputField = ({type, name, value, placeholder, onChange}: InputFieldProps) => (
    <div className="form-group">
        {/* <label htmlFor={`${name}-input`}>{label}</label> */}
        <input name={name} type={type} className="form-control" id={name} aria-describedby={`${name}-help`} aria-label={name}
            placeholder={placeholder} value={value} onChange={onChange} />
            {/* placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} /> */}
        {/* {helpText && <small id={`${name}-help`} className="form-text text-muted" data-testid='helpText'>{helpText}</small>} */}
    </div>
);


export default InputField;
