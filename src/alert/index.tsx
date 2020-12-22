import React from 'react';
import { StyledAlert } from './styles';

const Alert = ({text, style}: AlertProps) => (
    <StyledAlert style={style} role="alert">{text}</StyledAlert>
);

export default Alert;