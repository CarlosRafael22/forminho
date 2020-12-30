import React from 'react';
import styled from 'styled-components';

const defaultStyle = {
    display: 'inline-block',
    margin: '5px'
};

const StyledLabel = styled.label`
    padding: 10px;
`;

// TO DO: Receive label custom style 
// Remove the need of providing the options, we could pass an array with the names of value and label
// Remove type field

const Select = ({name, value, onChange, children, label, style}: SelectProps) => (
    <div style={{...defaultStyle, ...style}}>
        {label && <StyledLabel htmlFor={`${name}-input`}>{label}</StyledLabel>}
        <select role='listbox' name={name} id={name} aria-describedby={`${name}-help`} aria-label={name}
            value={value} onChange={onChange}>
                {children}
        </select>
    </div>
);

export default Select;