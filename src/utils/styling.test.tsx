import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { getStylingProps } from './styling'

describe('Testing getStylingProps ', () => {
    const defaultStyle = {
        backgroundColor: 'blue',
        fontSize: '16px'
    }

    it('should return className if passed', () => {
        const stylePropsArgs = { className: 'redStyle' }
        const style = getStylingProps(defaultStyle, stylePropsArgs)
        expect(style).toEqual(stylePropsArgs)
    })

    it('should return className if style is {}', () => {
        const stylePropsArgs = { style: {}, className: 'redStyle' }
        const style = getStylingProps(defaultStyle, stylePropsArgs)
        expect(style).toEqual({ className: 'redStyle' })
    })

    it('should return based on style object if passed', () => {
        // Also pass className: 'red' to test the getStylingProps priority since style comes before className
        const stylePropsArgs = { style: { fontSize: '46px', color: 'white' }, className: 'red' }
        const style = getStylingProps(defaultStyle, stylePropsArgs)
        expect(style).toEqual({ style: {
            backgroundColor: 'blue',
            fontSize: '46px',
            color: 'white'
        }})
    })

    it('should have style based on styleSheet created and return class name if css prop is passed', () => {
        // Also pass other fields to test the getStylingProps priority since css comes before style and className
        const stylePropsArgs = {
            css: `
                background-color: black;
                color: white;
                font-size: 40px;
            `,
            style: { fontSize: '46px', color: 'white' },
            className: 'red'
        }
        const style = getStylingProps(defaultStyle, stylePropsArgs)
        expect(typeof style.className).toBe('string')

        // const rendered = renderer.create(<div className={style}></div>).toJSON()
        render(<div className={style.className} data-testid='div' />)
        expect(screen.getByTestId('div')).toHaveStyle({
            backgroundColor: 'black',
            color: 'white',
            fontSize: '40px'
        })
        // expect(container.firstChild).toMatchSnapshot()
    })
})