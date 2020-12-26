import React from 'react';

const defaultStyle = {
    display: 'block',
    margin: '5px'
};

const Checkbox = ({name, label, onChange, stateValue, style}: CheckboxProps) => (
    <label style={{...defaultStyle,...style}}>
        {label}
        <input
        type="checkbox"
        name={name}
        checked={stateValue}
        onChange={onChange}
        />
    </label>
);

export default Checkbox;