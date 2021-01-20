import React, { CSSProperties } from 'react';

const Button = ({text = 'Submit', style = {}, children}: ButtonProps) => {

    return (
        <button style={{...defaultStyle, ...style}}>{children ? children : text}</button>
    )
}

const defaultStyle = {
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 700,
    border: '0',
    borderRadius: '3em',
    cursor: 'pointer',
    display: 'inline-block',
    lineHeight: 1,
    color: 'white',
    backgroundColor: '#1ea7fd',
    fontSize: '12px',
    padding: '10px 16px',
    marginTop: '0.5rem',
} as CSSProperties

export default Button;