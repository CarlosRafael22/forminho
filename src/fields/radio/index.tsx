import React from 'react';

const defaultStyle = {
    padding: '5px'
};

// TO DO: If the user doesnt provide the label param it will be the same as value
// Value should be required while label no
// Create a Radio Group with its label inside representing the question for the select options

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