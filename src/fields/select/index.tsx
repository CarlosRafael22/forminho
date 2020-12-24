import React from 'react';

const Select = ({name, value, onChange, children, label, style}: SelectProps) => (
    <div>
        {label && <label htmlFor={`${name}-input`}>{label}</label>}
        <select role='listbox' style={style} name={name} id={name} aria-describedby={`${name}-help`} aria-label={name}
            value={value} onChange={onChange}>
                {children}
        </select>
    </div>
);

export default Select;