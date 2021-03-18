import React, { CSSProperties } from 'react'

const defaultStyle = {
    position: 'relative',
    padding: '.25rem 1rem',
    marginBottom: '1rem',
    border: '1px solid transparent',
    borderRadius: '.25rem',

    color: '#721c24',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
} as CSSProperties

const Alert = ({text, style}: AlertProps) => (
    <div style={{...defaultStyle, ...style}} role="alert">{text}</div>
)

export default Alert