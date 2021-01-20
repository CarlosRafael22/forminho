import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Button from './'
import { Custom as CustomButton } from './Button.stories'


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
})