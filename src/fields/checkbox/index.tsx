import React from 'react';

const Checkbox = ({name, label, onChange, stateValue, style}: CheckboxProps) => (
    <label style={style}>
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