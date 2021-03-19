import React, { CSSProperties } from 'react';
import { getStylingProps } from '../utils/styling'

const Button = ({text = 'Submit', style = {}, children, css, className, type = 'submit', onClick}: ButtonProps) => {
    const styleProps = getStylingProps(defaultStyle, { style, css, className })

    return (
        <button {...{...styleProps, onClick, type}}>{children ? children : text}</button>
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