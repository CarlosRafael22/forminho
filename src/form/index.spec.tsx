import React from 'react';
import { render } from '@testing-library/react';
import InputField from '../fields/InputField';
import Form from "./";

test("Render Form", () => {
    const inputProps = {
        type: 'text',
        name: 'name',
        placeholder: 'Enter your name',
        value: '',
        onChange: jest.fn()
    };

    const child1 = <InputField {...inputProps} />;
    const secondProps = {...inputProps, placeholder: 'Enter'};
    const child2 = <InputField {...secondProps} />;

    const props = {
        initialValues: {
            email: '',
            name: ''
        },
        onSubmitHandler: jest.fn(),
        children: [child1, child2]
    };
    const wrapper = render(
        <Form {...props} />
    )
    expect(wrapper.queryByPlaceholderText(inputProps.placeholder)).not.toBeNull();
    // expect(wrapper.queryByText(props.label)).not.toBeNull();
    // expect(wrapper.queryByText(props.helpText)).not.toBeNull();
    // expect(wrapper.queryByDisplayValue(props.value)).not.toBeNull();
});