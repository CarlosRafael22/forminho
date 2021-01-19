import React from 'react';
import { Story, Meta } from '@storybook/react';
import Field from '../../fields';


export default {
    title: 'Simple-Form/Checkbox',
    component: Field.Checkbox
} as Meta;

const Template: Story<CheckboxProps> = (args) => (<Field.Checkbox {...args} />);

export const Default = Template.bind({});
Default.args = {
    name: 'terms',
    label: 'Accept terms'
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
    ...Default.args,
    style: { backgroundColor: 'red', padding: '10px', fontWeight: '700', color: 'white' }
};

export const GroupedCheckboxesOnlyWithValue = (args: any) => (
    <>
        <Field.Checkbox name='languages' value={args.values[0]} />
        <Field.Checkbox name='languages' value={args.values[1]} />
    </>
)
GroupedCheckboxesOnlyWithValue.args = {
    values: ['Portuguese', 'English'],
    labels: ['Portuguese', 'English']
}

export const GroupedCheckboxesWithValueAndLabel = (args: any) => (
    <>
        <Field.Checkbox name='languages' value={args.values[0]} label={args.labels[0]} />
        <Field.Checkbox name='languages' value={args.values[1]} label={args.labels[1]} />
    </>
)
GroupedCheckboxesWithValueAndLabel.args = {
    values: ['Portuguese', 'English'],
    labels: ['pt', 'en']
}