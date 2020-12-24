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
    type: 'checkbox',
    name: 'terms',
    label: 'Accept terms'
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
    ...Default.args,
    style: { backgroundColor: 'red', padding: '10px', fontWeight: '700', color: 'white' }
};