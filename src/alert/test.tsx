import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Alert from './index';


describe('Testing Alert rendering', () => {
    test('It should render with text prop', () => {
        const props = {
            text: 'An error occurred'
        };
        const { getByText } = render(<Alert {...props} />);

        expect(getByText(props.text)).toBeTruthy();
    });

    test('It should render with custom style prop', () => {
        const props = {
            text: 'An error occurred',
            style: { backgroundColor: 'blue' }
        };
        const { getByText, getByRole } = render(<Alert {...props} />);

        expect(getByText(props.text)).toBeTruthy();
        expect(getByRole('alert')).toHaveStyle(props.style);
    });
})