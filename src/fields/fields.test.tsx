import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Default as DefaultCheckbox, GroupedCheckboxesOnlyWithValue, GroupedCheckboxesWithValueAndLabel } from '../stories/fields/Checkbox.stories'
import { RadioWithValueAndLabel, RadioWithOnlyValue } from '../stories/fields/Radio.stories'

describe('Testing Checkbox cases', () => {
    it('should render checkbox', () => {
        render(<DefaultCheckbox {...DefaultCheckbox.args} />)
        expect(screen.getByLabelText(DefaultCheckbox.args.label)).toBeInTheDocument()
    })

    it('should have label from label prop when its provided', () => {
        render(<GroupedCheckboxesWithValueAndLabel {...GroupedCheckboxesWithValueAndLabel.args} />)
        screen.debug()
        expect(screen.queryAllByRole('checkbox').length).toBe(2)
        expect(screen.getByLabelText(GroupedCheckboxesWithValueAndLabel.args.labels[0])).toBeInTheDocument()
        expect(screen.getByLabelText(GroupedCheckboxesWithValueAndLabel.args.labels[1])).toBeInTheDocument()
    })

    it('should have label from value prop when label prop is not provided', () => {
        render(<GroupedCheckboxesOnlyWithValue {...GroupedCheckboxesOnlyWithValue.args} />)
        screen.debug()
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
        screen.debug()
        expect(screen.getByLabelText(RadioWithValueAndLabel.args.label)).toBeInTheDocument()
    })

    it('should have label from value prop when label prop is not provided', () => {
        render(<RadioWithOnlyValue {...RadioWithOnlyValue.args} />)
        screen.debug()
        expect(screen.getByLabelText(RadioWithOnlyValue.args.value)).toBeInTheDocument()
    })
})