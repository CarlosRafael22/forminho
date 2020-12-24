import React from 'react';
import { TextAreaDiv, StyledLabel } from './styles';

const TextArea = ({name, value, placeholder, onChange, label, style}: TextAreaProps) => (
    <div>
        {label && <StyledLabel htmlFor={`${name}-input`}>{label}</StyledLabel>}
        <TextAreaDiv style={style} name={name} id={name} aria-describedby={`${name}-help`} aria-label={name}
            placeholder={placeholder} value={value} onChange={onChange} />
    </div>
);


export default TextArea;
