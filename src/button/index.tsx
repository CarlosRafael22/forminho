import React, { CSSProperties } from 'react';
import { constructCssStyleAndReturnClassName } from '../utils'

const Button = ({text = 'Submit', style = {}, children, css}: ButtonProps) => {
    const buttonProps = () => {
        let buttonProps
        if (css) {
            const className = constructCssStyleAndReturnClassName(css)
            buttonProps = {
                className: className
            }
        } else {
            buttonProps = {
                style: {...defaultStyle, ...style}
            }
        }
        console.log('BUTTON PROOPS ----- ', buttonProps)
        return buttonProps
    }

    return (
        <button {...buttonProps()}>{children ? children : text}</button>
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