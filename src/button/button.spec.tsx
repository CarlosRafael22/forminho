import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Button from './';


describe('Render Button', () => {
    test('It should render without props', () => {
        const { getByText } = render(<Button />);
        expect(getByText('Submit')).toBeTruthy();
    });

    test('It should render with props', () => {
        const props = {
            text: 'Send',
            style: { backgroundColor: 'red' }
        };
        const { getByText } = render(<Button {...props} />);
        const button = getByText(props.text);
        expect(button).toBeTruthy();
        expect(button).toHaveStyle(props.style);
    });
});