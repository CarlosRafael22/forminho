import React from 'react';
import { ButtonDiv } from './styles';

const Button = ({text = 'Submit', style = {}}: ButtonProps) => (
    <ButtonDiv style={style}>{text}</ButtonDiv>
);

export default Button;