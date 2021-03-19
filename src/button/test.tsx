import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Default as DefaultButton, Custom as CustomButton, WithCssAndSelector } from './stories'


describe('Render Button', () => {
    it('should render without props', () => {
        render(<DefaultButton />);
        expect(screen.getByText('Submit')).toBeInTheDocument();
    })

    it('should render with style and text props', () => {
        render(<CustomButton {...CustomButton.args} />);
        const button = screen.getByText(CustomButton.args.text);
        expect(button).toHaveStyle(CustomButton.args.style);
    })

    it('should render children if it was passed', () => {
        const props = {
            children: [<p>Hello</p>]
        }
        render(<DefaultButton {...props} />)
        expect(screen.getByRole('button', { name: /Hello/i })).toBeInTheDocument()
    })

    it('should render with css style if prop was passed', () => {
        render(<WithCssAndSelector {...WithCssAndSelector.args} />)
        const button = screen.getByRole('button', { name: WithCssAndSelector.args.text })
        screen.debug()
        expect(button).toBeInTheDocument()
        expect(button).toHaveStyle({
            backgroundColor: 'red',
            color: 'white',
            fontSize: '16px'
        })

        // NEEDS TO TEST WHETHER ON HOVER IT CHANGES STYLE
        // fireEvent.mouseOver(button)
        // fireEvent.mouseEnter(button)
        // expect(button).toHaveStyle({
        //     backgroundColor: 'blue',
        //     color: 'white',
        //     fontSize: '16px'
        // })
    })

    it('should have class name based on className prop', () => {
        const stylePropsArgs = { className: 'red' }
        render(<DefaultButton {...stylePropsArgs} />)
        screen.debug()
        expect(screen.getByRole('button')).toHaveClass(stylePropsArgs.className)
    })

})