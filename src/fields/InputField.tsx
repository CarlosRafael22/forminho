import React from 'react';
import { InputDiv } from './styles';

const InputField = ({type, name, value, placeholder, onChange}: InputFieldProps) => (
    <div className="form-group">
        {/* <label htmlFor={`${name}-input`}>{label}</label> */}
        <InputDiv name={name} type={type} id={name} aria-describedby={`${name}-help`} aria-label={name}
            placeholder={placeholder} value={value} onChange={onChange} />
            {/* placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} /> */}
        {/* {helpText && <small id={`${name}-help`} className="form-text text-muted" data-testid='helpText'>{helpText}</small>} */}
    </div>
);


export default InputField;
