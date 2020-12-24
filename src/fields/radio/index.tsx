import React from 'react';

const Radio = ({name, value, label, onChange, stateValue, style}: RadioProps) => (
    <label style={style}>
        {label}
        <input
        type="radio"
        name={name}
        value={value}
        checked={stateValue === value}
        onChange={onChange}
        />
    </label>
);

export default Radio;