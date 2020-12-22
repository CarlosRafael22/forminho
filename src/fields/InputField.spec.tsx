import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WithPlaceholder, WithLabel, WithStyle } from '../stories/fields/InputField.stories';

describe('Test InputField rendering', () => {
    test('Should render with placeholder passed', () => {
        const { getByPlaceholderText } = render(<WithPlaceholder {...WithPlaceholder.args} />);
        expect(getByPlaceholderText(WithPlaceholder.args.placeholder)).toBeTruthy();
    });
    
    test('Should render with label passed', () => {
        const { getByText } = render(<WithLabel {...WithLabel.args} />);
        expect(getByText(WithLabel.args.label)).toBeTruthy();
    });

    test('Should call onChange when input is typed', () => {
        const props = {
            ...WithPlaceholder.args,
            onChange: jest.fn()
        };
        // GIVEN
        const { getByPlaceholderText } = render(<WithPlaceholder {...props} />);
        const input = getByPlaceholderText(WithPlaceholder.args.placeholder);

        // WHEN
        fireEvent.change(input, { target: { value: 'T' } });

        // THEN
        expect(props.onChange).toHaveBeenCalled();
    });

    test('Should render with custom style passed', () => {
        const props = {
            ...WithStyle.args,
            style: { backgroundColor: 'red', color: 'white' },
            onChange: jest.fn()
        };
        const { getByPlaceholderText } = render(<WithStyle {...props} />);

        expect(getByPlaceholderText(props.placeholder)).toHaveStyle(props.style);
    });
});