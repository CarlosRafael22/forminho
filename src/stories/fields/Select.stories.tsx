import React from 'react';
import { Story, Meta } from '@storybook/react';
import Field from '../../fields';

export default {
    title: 'Simple-Form/Select',
    component: Field.Select
} as Meta;

const Template: Story<SelectProps> = (args) => (
    <Field.Select {...args} >
        {args.children}
    </Field.Select>
);

export const Default = Template.bind({});
Default.args = {
    type: 'select',
    name: 'team',
    value: 'Tottenham',
    children: [
        <option value='Arsenal' key='2'>Arsenal</option>,
        <option value='Chelsea' key='1'>Chelsea</option>,
        <option value='Tottenham' key='3'>Tottenham</option>,
        <option value='West Ham' key='4'>West Ham</option>
    ]
};

export const WithLabel = Template.bind({});
WithLabel.args = {
    ...Default.args,
    label: 'Select the best club in London'
};

export const WithCustomStyle = Template.bind({});
WithCustomStyle.args = {
    ...WithLabel.args,
    style: { backgroundColor: 'red', color: 'white' }
};

export const WithOptionsPassed = Template.bind({})
WithOptionsPassed.args = {
    type: 'select',
    name: 'team',
    label: 'Choose a team',
    value: 'Arsenal',
    options: ['Arsenal', 'Chelsea', 'Tottenham', 'West Ham']
}