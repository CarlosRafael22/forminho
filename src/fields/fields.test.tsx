import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Default as DefaultCheckbox, GroupedCheckboxesOnlyWithValue, GroupedCheckboxesWithValueAndLabel } from '../stories/fields/Checkbox.stories'
import { RadioWithValueAndLabel, RadioWithOnlyValue } from '../stories/fields/Radio.stories'
import { WithOptionsPassed, WithLabel as SelectWithLabelAndChildren } from '../stories/fields/Select.stories'
import { WithPlaceholder, WithStyle, WithCss } from '../stories/fields/Input.stories'
import { Field } from '..'

describe('Testing Checkbox cases', () => {
    it('should render checkbox', () => {
        render(<DefaultCheckbox {...DefaultCheckbox.args} />)
        expect(screen.getByLabelText(DefaultCheckbox.args.label)).toBeInTheDocument()
    })

    it('should have label from label prop when its provided', () => {
        render(<GroupedCheckboxesWithValueAndLabel {...GroupedCheckboxesWithValueAndLabel.args} />)
        expect(screen.queryAllByRole('checkbox').length).toBe(2)
        expect(screen.getByLabelText(GroupedCheckboxesWithValueAndLabel.args.labels[0])).toBeInTheDocument()
        expect(screen.getByLabelText(GroupedCheckboxesWithValueAndLabel.args.labels[1])).toBeInTheDocument()
    })

    it('should have label from value prop when label prop is not provided', () => {
        render(<GroupedCheckboxesOnlyWithValue {...GroupedCheckboxesOnlyWithValue.args} />)
        expect(screen.queryAllByRole('checkbox').length).toBe(2)
        expect(screen.getByLabelText(GroupedCheckboxesOnlyWithValue.args.values[0])).toBeInTheDocument()
        expect(screen.getByLabelText(GroupedCheckboxesOnlyWithValue.args.values[1])).toBeInTheDocument()
    })
})


describe('Testing Radio cases', () => {
    it('should render radio', () => {
        render(<RadioWithValueAndLabel {...RadioWithValueAndLabel.args} />)
        expect(screen.getByLabelText(RadioWithValueAndLabel.args.label)).toBeInTheDocument()
    })

    it('should have label from label prop when its provided', () => {
        render(<RadioWithValueAndLabel {...RadioWithValueAndLabel.args} />)
        expect(screen.getByLabelText(RadioWithValueAndLabel.args.label)).toBeInTheDocument()
    })

    it('should have label from value prop when label prop is not provided', () => {
        render(<RadioWithOnlyValue {...RadioWithOnlyValue.args} />)
        expect(screen.getByLabelText(RadioWithOnlyValue.args.value)).toBeInTheDocument()
    })
})


describe('Testing Select cases', () => {
    it('should render select with options passed', () => {
        render(<WithOptionsPassed {...WithOptionsPassed.args} />)
        expect(screen.getAllByRole('option').length).toBe(4)
        WithOptionsPassed.args.options.forEach((option: string, i: number) => {
            expect(screen.queryAllByRole('option')[i]).toHaveTextContent(option)
        });
    })

    it('should render select with children and no options passed', () => {
        render(<SelectWithLabelAndChildren {...SelectWithLabelAndChildren.args} />)
        expect(screen.getAllByRole('option').length).toBe(4)
        // Using the options array of WithOptionsPassed since they should show the same children
        WithOptionsPassed.args.options.forEach((option: string, i: number) => {
            expect(screen.queryAllByRole('option')[i]).toHaveTextContent(option)
        });
    })
})


describe('Testing Field Ref Forwarding', () => {
    it('should receive the ref prop and call focus', () => {
        const refCallback = (node: any) => {
            console.log('Attached: ', node)
            node && node.current!.focus()
        }
        render(<Field.Input ref={refCallback} name='name' placeholder='Type name' />)
        expect(screen.getByPlaceholderText(/Type name/i)).toHaveFocus()
    })
})

describe('Testing Styling for basic Field.Input', () => {
    it('should have class name based on className prop', () => {
        const stylePropsArgs = { className: 'red' }
        render(<WithPlaceholder {...{...WithPlaceholder.args, ...stylePropsArgs}} />)
        expect(screen.getByPlaceholderText(WithPlaceholder.args.placeholder)).toHaveClass(stylePropsArgs.className)
    })

    it('should have style based on style prop', () => {
        render(<WithStyle {...WithStyle.args} />)
        screen.debug()
        expect(screen.getByPlaceholderText(WithStyle.args.placeholder)).toHaveStyle(WithStyle.args.style)
    })

    it('should have style based on css prop', () => {
        render(<WithCss {...WithCss.args} />)
        screen.debug()
        expect(screen.getByPlaceholderText(WithCss.args.placeholder)).toHaveStyle({
            backgroundColor: 'black',
            color: 'white',
            fontSize: '16px'
        })
    })
})