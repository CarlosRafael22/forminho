import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Field from '../fields';
import Form from ".";
import Forminho from '../Forminho';


describe('Test styling of Form', () => {
    const getForm = (styleProps: Object) => {
        return (
            <Forminho>
                <Form
                    initialValues={{ email: '' }}
                    onSubmitHandler={jest.fn()}
                    {...styleProps}
                >
                    // @ts-ignore
                    <Field.Input name='email' type='text' label='Email:' />
                </Form>
            </Forminho>
        )
    }

    it('should have style based on style prop', () => {
        const stylePropsArgs = { style: { fontSize: '46px', color: 'white' }, className: 'red' }
        render(getForm(stylePropsArgs))
        const input = screen.getByLabelText('Email:')
        expect(input.closest('form')).toHaveStyle(stylePropsArgs.style)
    })

    it('should have form class name based on className prop', () => {
        const stylePropsArgs = { className: 'red' }
        render(getForm(stylePropsArgs))
        const input = screen.getByLabelText('Email:')
        expect(input.closest('form')).toHaveClass(stylePropsArgs.className)
    })

    it('should have style based on css prop', () => {
        const stylePropsArgs = { css: `
            font-size: 46px;
            color: white;
            background-color: red;
        ` }
        render(getForm(stylePropsArgs))
        const input = screen.getByLabelText('Email:')
        expect(input.closest('form')).toHaveStyle({
            fontSize: '46px',
            color: 'white',
            backgroundColor: 'red'
        })
    })
})