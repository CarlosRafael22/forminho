import * as React from 'react';
import { render } from '@testing-library/react';
import InputField from "./InputField";

test("create a new hello", () => {
    const props = {
        type: 'text',
        name: 'name',
        placeholder: 'Enter your name',
        value: '',
        onChange: jest.fn()
    };
    const wrapper = render(<InputField {...props} />)
    expect(wrapper.queryByPlaceholderText(props.placeholder)).not.toBeNull();
    // expect(wrapper.queryByText(props.label)).not.toBeNull();
    // expect(wrapper.queryByText(props.helpText)).not.toBeNull();
    expect(wrapper.queryByDisplayValue(props.value)).not.toBeNull();
});