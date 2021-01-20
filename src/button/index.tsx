import React, { CSSProperties } from 'react';
import { getSelectorsArray, getSelectorsAndMainStyleBlocks, attachCssStyleToDocument } from '../utils'

const constructCssStyle = (css: string): string => {
    // First try to find a & for a selector then splice on it
    // If there are no & then we should wrap all these rules in a {} and defined a class name for it
    const generateRandomString = (length=6) => Math.random().toString(20).substr(2, length)
    const className = generateRandomString(8)
    // const className = 'testinho'

    const selectorsPositions = getSelectorsArray(css)
    const [mainStyleBlock, selectorsStyleBlocks] = getSelectorsAndMainStyleBlocks(css, selectorsPositions, className)
    const parsedCssRules = (`${mainStyleBlock}
        ${selectorsStyleBlocks}`)
    attachCssStyleToDocument(parsedCssRules)
    console.log('CLASS NAMEEE ------ ', className)
    return className
}

const Button = ({text = 'Submit', style = {}, children, css}: ButtonProps) => {
    const buttonProps = () => {
        let buttonProps
        if (css) {
            const className = constructCssStyle(css)
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