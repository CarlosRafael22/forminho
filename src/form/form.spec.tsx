import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import Field from '../fields';
import Form from ".";
// import { WithButtonAsChild, WithFieldsAndLabelsAndPlaceholders, WithSubmitButtonText } from '../stories/form/Form.stories';
// import { Default as DefaultSelect } from '../stories/fields/Select.stories';
// import { Default as DefaultRadio } from '../stories/fields/Radio.stories';
// import { WithSelect } from '../stories/form/Form.stories';
// import { Default as DefaultCheckbox } from '../stories/fields/Checkbox.stories';


describe('Render Form testing with Field.Input', () => {
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
    
        const child1 = <Field.Input {...firstChildProps} />;
        const secondChildProps = {...firstChildProps, name: 'lastName', placeholder: 'Enter your last name'};
        const child2 = <Field.Input {...secondChildProps} />;
    
        const formProps = {
            initialValues: {
                firstName: '',
                lastName: ''
            },
            onSubmitHandler: jest.fn(),
            children: [child1, child2],
            onValidationHandler: jest.fn((values: ObjectType) => {
                let errors: string[] = []
                if(!values.firstName) {
                    errors.push(error1Message)
                }
                if(!values.lastName) {
                    errors.push(error2Message)
                }
                return errors
            })
        };

        return { formProps, firstChildProps, secondChildProps, error1Message, error2Message };
    };

    // test("It should render Field.Inputs passed", () => {
    //     const { formProps, firstChildProps, secondChildProps } = getFormTestProps();
    //     const wrapper = render(
    //         <Forminho>
    //             <Form {...formProps} />
    //         </Forminho>
    //     );
    //     expect(wrapper.queryByPlaceholderText(firstChildProps.placeholder as string)).not.toBeNull();
    //     expect(wrapper.queryByPlaceholderText(secondChildProps.placeholder)).not.toBeNull();
    // });

    // test('It should render Field.Inputs with their initialValues', () => {
    //     const { formProps, firstChildProps, secondChildProps } = getFormTestProps();
    //     const { getByPlaceholderText } = render(
    //         <Forminho>
    //             <Form {...formProps} />
    //         </Forminho>
    //     );
    //     expect(getByPlaceholderText(firstChildProps.placeholder as string)).toHaveValue(formProps.initialValues.firstName);
    //     expect(getByPlaceholderText(secondChildProps.placeholder as string)).toHaveValue(formProps.initialValues.lastName);
    // })

    // This also test the logic of the custom hook since we are testing whether the values were saved on the hook state
    // test('It should call onSubmitHandler with the Field.Inputs values when submitting the form', () => {
    //     const { formProps, firstChildProps, secondChildProps } = getFormTestProps();
    //     render(<Form {...formProps} />);

    //     const button = screen.getByRole('button');
    //     const firstInput = screen.getByPlaceholderText(firstChildProps.placeholder as string);
    //     const secondInput = screen.getByPlaceholderText(secondChildProps.placeholder as string);
    //     const expectedValues = {
    //         firstName: 'New',
    //         lastName: 'Values'
    //     };

    //     // GIVEN
    //     // The user has typed on inputs
    //     fireEvent.change(firstInput, { target: { value: expectedValues.firstName}});
    //     fireEvent.change(secondInput, { target: { value: expectedValues.lastName}});

    //     expect(screen.getByDisplayValue('New')).toBeInTheDocument()

    //     // WHEN
    //     fireEvent.click(button);
    //     screen.debug();

    //     // THEN
    //     expect(formProps.onSubmitHandler).toHaveBeenLastCalledWith(expectedValues);
    // });

    test('It should show Alerts based on onValidationHandler errors', () => {
        const { formProps, error1Message, error2Message } = getFormTestProps();
        render(<Form {...formProps} />);

        const button = screen.getByRole('button');

        // WHEN
        fireEvent.click(button);

        // THEN
        expect(formProps.onSubmitHandler).not.toHaveBeenCalled();
        expect(screen.getByText(error1Message)).toBeInTheDocument()
        expect(screen.getByText(error2Message)).toBeInTheDocument()
    });

    // test('It should call onValidationHandler after clicking on submit if it was passed as props', () => {
    //     const { formProps, } = getFormTestProps();
    //     const { getByRole } = render(
    //         <Forminho>
    //             <Form {...formProps} />
    //         </Forminho>
    //     );
    //     // GIVEN
    //     const button = getByRole('button');
    //     // WHEN
    //     fireEvent.click(button);
    //     // THEN
    //     expect(formProps.onValidationHandler).toBeCalledWith(formProps.initialValues);
    // });

    // test('It should show error alert if onValidationHandler failed', () => {
    //     const { formProps, } = getFormTestProps();
    //     const { getByRole, getByText } = render(
    //         <Forminho>
    //             <Form {...formProps} />
    //         </Forminho>
    //     );
    //     // GIVEN
    //     const button = getByRole('button');
    //     // WHEN
    //     fireEvent.click(button);
    //     // THEN
    //     expect(formProps.onValidationHandler).toBeCalledWith(formProps.initialValues);
    //     expect(getByRole('alert')).toBeTruthy();
    //     expect(getByText(error1Message)).toBeTruthy();
    // });

    // test('It should render the Button with the submitButtonText props', () => {
    //     const { queryByRole } = render(<WithSubmitButtonText {...WithSubmitButtonText.args} />);
    //     const button = queryByRole('button');

    //     expect(button).not.toBeNull();
    //     expect(button).toHaveTextContent(WithSubmitButtonText.args.submitButtonText);
    // });

    // test('It should render only the Button passed as child', () => {
    //     const { queryByRole } = render(<WithButtonAsChild {...WithButtonAsChild.args} />);
    //     const button = queryByRole('button');

    //     expect(button).not.toBeNull();
    // });

    // test('It should render the standard Button when none is passed', () => {
    //     const { queryByRole } = render(<WithFieldsAndLabelsAndPlaceholders {...WithFieldsAndLabelsAndPlaceholders.args} />);
    //     const button = queryByRole('button');

    //     expect(button).not.toBeNull();
    //     expect(button).toHaveTextContent('Submit');
    // });

});


// describe('Form rendering tests with Field.Select', () => {

//     const getFormTestProps = ()  => {
//         const props: SelectProps = {
//             ...DefaultSelect.args,
//             onChange: jest.fn()
//         };

//         const select = <DefaultSelect {...props} />;
    
//         const formProps = {
//             initialValues: {
//                 team: 'Arsenal'
//             },
//             onSubmitHandler: jest.fn(),
//             children: [select],
//         };

//         return { formProps, props };
//     };

//     test('It should call onSubmitHandler with the correct Field.Select values when submitting the form', () => {
//         const { formProps, } = getFormTestProps();
//         const { getByRole } = render(
//             <Form {...formProps} />
//         );
//         const select = getByRole('combobox');
//         const button = getByRole('button');
//         expect(select).toBeTruthy();

//         fireEvent.change(select, { target: { value: 'Chelsea' } });
//         fireEvent.click(button);

//         expect(formProps.onSubmitHandler).toHaveBeenLastCalledWith({ team: 'Chelsea' });
//     });
// });


// describe('Form rendering tests with Field.Radio', () => {

//     const getFormTestProps = ()  => {
//         const props: RadioProps = {
//             ...DefaultRadio.args,
//             onChange: jest.fn()
//         };

//         const radio1 = <DefaultRadio {...props} />;
//         const radio2 = <DefaultRadio {...{...props, label: 'Arsenal', value: 'Arsenal'}} />;
//         const radio3 = <DefaultRadio {...{...props, label: 'Tottenham', value: 'Tottenham'}} />;
    
//         const formProps = {
//             initialValues: {
//                 team: 'Chelsea'
//             },
//             onSubmitHandler: jest.fn(),
//             children: [radio1, radio2, radio3],
//         };

//         return { formProps, props };
//     };

//     test('It should call onSubmitHandler with the correct Field.Radio selected value when submitting the form', () => {
//         const { formProps, } = getFormTestProps();
//         render(<Form {...formProps} />);

//         const radios = screen.queryAllByRole('radio') as HTMLElement[];
//         const button = screen.getByRole('button');
//         expect(radios).toBeTruthy();


//         fireEvent.click(radios[1]);
//         fireEvent.click(button);

//         expect(formProps.onSubmitHandler).toHaveBeenLastCalledWith({ team: 'Arsenal' });
//     });

// });


// describe('Form rendering tests with Field.Checkbox', () => {

//     const getFormTestProps = ()  => {
//         const checkbox = <DefaultCheckbox {...DefaultCheckbox.args} />;
    
//         const formProps = {
//             initialValues: {
//                 terms: false
//             },
//             onSubmitHandler: jest.fn(),
//             children: [checkbox],
//         };

//         return { formProps };
//     };

//     test('It should call onSubmitHandler with the Field.Checkbox state value as true after clicking on it', () => {
//         const { formProps } = getFormTestProps();
//         render(
//             <Forminho>
//                 <Form {...formProps} />
//             </Forminho>
//         );

//         const checkbox = screen.getByRole('checkbox');
//         const button = screen.getByRole('button');
//         expect(checkbox).toBeTruthy();


//         fireEvent.click(checkbox);
//         fireEvent.click(button);
//         screen.debug();

//         expect(formProps.onSubmitHandler).toHaveBeenLastCalledWith({ terms: true });
//     });

// });

// describe('Form rendering tests with Field.Select', () => {

//     // const getFormTestProps = ()  => {
//     //     const props: CheckboxProps = {
//     //         ...DefaultCheckbox.args
//     //     };

//     //     const checkbox = <DefaultCheckbox {...props} />;
    
//     //     const formProps = {
//     //         initialValues: {
//     //             terms: false
//     //         },
//     //         onSubmitHandler: jest.fn(),
//     //         children: [checkbox],
//     //     };

//     //     return { formProps, props };
//     // };

//     test('It should call onSubmitHandler with the Field.Checkbox state value as true after clicking on it', () => {
//         // const { formProps, } = getFormTestProps();
//         render(<WithSelect {...WithSelect.args} />);
//         screen.debug();

//         // const checkbox = screen.getByRole('checkbox');
//         // const button = screen.getByRole('button');
//         // expect(checkbox).toBeTruthy();


//         // fireEvent.click(checkbox);
//         // fireEvent.click(button);

//         // expect(formProps.onSubmitHandler).toHaveBeenLastCalledWith({ terms: true });
//     });

// });