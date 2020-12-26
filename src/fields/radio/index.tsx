import React from 'react';

const defaultStyle = {
    padding: '5px'
};

const Radio = ({name, value, label, onChange, stateValue, style}: RadioProps) => (
    <label style={{...defaultStyle, ...style}}>
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