import React from 'react';
import { Story, Meta } from '@storybook/react';
import Field from '../../fields';

export default {
    title: 'Simple-Form/InputField',
    component: Field.Input,
} as Meta;

const Template: Story<FieldProps> = (args) => <Field.Input {...args} />;

export const Default = Template.bind({})
Default.args = {
    type: 'text',
    name: 'name',
    value: ''
};

const placeholder = 'Enter your name'

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
    ...Default.args,
    placeholder
};

export const WithoutPlaceholder = Template.bind({});
WithoutPlaceholder.args = {
    ...Default.args
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
    ...Default.args,
    value: 'Default Value'
};

export const WithLabel = Template.bind({});
WithLabel.args = {
    ...Default.args,
    label: 'Name'
};

export const WithLabelAndPlaceholder = Template.bind({});
WithLabelAndPlaceholder.args = {
    ...WithLabel.args,
    placeholder
};

export const WithStyle = Template.bind({});
WithStyle.args = {
    ...WithLabelAndPlaceholder.args,
    style: { backgroundColor: 'red', color: 'white' }
};

export const WithCss = Template.bind({});
WithCss.args = {
    ...WithLabelAndPlaceholder.args,
    css: `
        background-color: black;
        color: white;
        font-size: 16px;

        &:hover {
            background-color: blue;
        }
    `
};