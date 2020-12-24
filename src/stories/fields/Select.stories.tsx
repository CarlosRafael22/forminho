import React from 'react';
import { Story, Meta } from '@storybook/react';
import Field from '../../fields';

export default {
    title: 'Simple-Form/Select',
    component: Field.Select
} as Meta;

const Template: Story<SelectProps> = (args) => (
    <Field.Select {...args} >
        <option value='Chelsea'>Chelsea</option>
        <option value='Arsenal'>Arsenal</option>
        <option value='Tottenham'>Tottenham</option>
        <option value='West Ham'>West Ham</option>
    </Field.Select>
);

export const Default = Template.bind({});
Default.args = {
    type: 'select',
    name: 'team',
    value: 'Arsenal'
};

export const WithLabel = Template.bind({});
WithLabel.args = {
    name: 'team',
    value: 'Arsenal',
    label: 'Select the best club in London'
};