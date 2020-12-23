import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import InputField from '../fields/InputField';
import Form from "./";
import { WithButtonAsChild, WithFieldsAndLabelsAndPlaceholders, WithSubmitButtonText } from '../stories/form/Form.stories';


describe('Render Form testing', () => {
    const error1Message = 'First name is required';
    const error2Message = 'Last name is required';

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
                firstName: '',
                lastName: ''
            },
            onSubmitHandler: jest.fn(),
            children: [child1, child2],
            onValidationHandler: jest.fn((values: initialValuesType) => {
                if(!values.firstName) {
                    throw Error(error1Message);
                } else if(!values.lastName) {
                    throw Error(error2Message);
                }
            })
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
    });

    test('It should call onValidationHandler after clicking on submit if it was passed as props', () => {
        const { formProps, } = getFormTestProps();
        const { getByRole } = render(
            <Form {...formProps} />
        );
        // GIVEN
        const button = getByRole('button');
        // WHEN
        fireEvent.click(button);
        // THEN
        expect(formProps.onValidationHandler).toBeCalledWith(formProps.initialValues);
    });

    test('It should show error alert if onValidationHandler failed', () => {
        const { formProps, } = getFormTestProps();
        const { getByRole, getByText } = render(<Form {...formProps} />);
        // GIVEN
        const button = getByRole('button');
        // WHEN
        fireEvent.click(button);
        // THEN
        expect(formProps.onValidationHandler).toBeCalledWith(formProps.initialValues);
        expect(getByRole('alert')).toBeTruthy();
        expect(getByText(error1Message)).toBeTruthy();
    });

    test('It should render the Button with the submitButtonText props', () => {
        const { queryByRole } = render(<WithSubmitButtonText {...WithSubmitButtonText.args} />);
        const button = queryByRole('button');

        expect(button).not.toBeNull();
        expect(button).toHaveTextContent(WithSubmitButtonText.args.submitButtonText);
    });

    test('It should render only the Button passed as child', () => {
        const { queryByRole } = render(<WithButtonAsChild {...WithButtonAsChild.args} />);
        const button = queryByRole('button');

        expect(button).not.toBeNull();
    });

    test('It should render the standard Button when none is passed', () => {
        const { queryByRole } = render(<WithFieldsAndLabelsAndPlaceholders {...WithFieldsAndLabelsAndPlaceholders.args} />);
        const button = queryByRole('button');

        expect(button).not.toBeNull();
        expect(button).toHaveTextContent('Submit');
    });

});