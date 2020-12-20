import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import InputField from '../fields/InputField';
import Form from "./";


describe('Render Form testing', () => {
    const getFormTestProps = ()  => {
        const firstChildProps: InputFieldProps = {
            type: 'text',
            name: 'firstName',
            placeholder: 'Enter your first name',
            value: '',
            onChange: jest.fn()
        };
    
        const child1 = <InputField {...firstChildProps} />;
        const secondChildProps = {...firstChildProps, name: 'lastName', placeholder: 'Enter your last name'};
        const child2 = <InputField {...secondChildProps} />;
    
        const formProps = {
            initialValues: {
                firstName: 'Test',
                lastName: 'Done'
            },
            onSubmitHandler: jest.fn(),
            children: [child1, child2]
        };

        return { formProps, firstChildProps, secondChildProps };
    };

    test("It should render InputFields passed", () => {
        const { formProps, firstChildProps, secondChildProps } = getFormTestProps();
        const wrapper = render(
            <Form {...formProps} />
        )
        expect(wrapper.queryByPlaceholderText(firstChildProps.placeholder as string)).not.toBeNull();
        expect(wrapper.queryByPlaceholderText(secondChildProps.placeholder)).not.toBeNull();
    });

    test('It should render InputFields with their initialValues', () => {
        const { formProps, firstChildProps, secondChildProps } = getFormTestProps();
        const { getByPlaceholderText } = render(
            <Form {...formProps} />
        );

        expect(getByPlaceholderText(firstChildProps.placeholder as string)).toHaveValue(formProps.initialValues.firstName);
        expect(getByPlaceholderText(secondChildProps.placeholder as string)).toHaveValue(formProps.initialValues.lastName);
    })

    // This also test the logic of the custom hook since we are testing whether the values were saved on the hook state
    test('It should call onSubmitHandler with the InputFields values when submitting the form', () => {
        const { formProps, firstChildProps, secondChildProps } = getFormTestProps();
        const { getByRole, getByPlaceholderText } = render(
            <Form {...formProps} />
        );

        const button = getByRole('button');
        const firstInput = getByPlaceholderText(firstChildProps.placeholder as string);
        const secondInput = getByPlaceholderText(secondChildProps.placeholder as string);
        const expectedValues = {
            firstName: 'New',
            lastName: 'Values'
        };

        // GIVEN
        // The user has typed on inputs
        fireEvent.change(firstInput, { target: { value: expectedValues.firstName}});
        fireEvent.change(secondInput, { target: { value: expectedValues.lastName}});

        // WHEN
        fireEvent.click(button);

        // THEN
        expect(formProps.onSubmitHandler).toHaveBeenLastCalledWith(expectedValues);
    })

});