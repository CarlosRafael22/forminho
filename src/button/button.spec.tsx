import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Button from './'
import { Custom as CustomButton, WithCss } from './Button.stories'


describe('Render Button', () => {
    it('should render without props', () => {
        render(<Button />);
        expect(screen.getByText('Submit')).toBeInTheDocument();
    })

    it('should render with props', () => {
        render(<CustomButton {...CustomButton.args} />);
        const button = screen.getByText(CustomButton.args.text);
        expect(button).toHaveStyle(CustomButton.args.style);
    })

    it('should render children if it was passed', () => {
        const props = {
            children: [<p>Hello</p>]
        }
        render(<Button {...props} />)
        expect(screen.getByRole('button', { name: /Hello/i })).toBeInTheDocument()
    })

    it('should render with css style if prop was passed', () => {
        render(<WithCss {...WithCss.args} />)
        const button = screen.getByRole('button', { name: WithCss.args.text })
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
})