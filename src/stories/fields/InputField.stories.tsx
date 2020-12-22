import React from 'react';
import { Story, Meta } from '@storybook/react';

import InputField from '../../fields/InputField';

export default {
    title: 'Example/InputField',
    component: InputField,
} as Meta;

const Template: Story<InputFieldProps> = (args) => <InputField {...args} />;

const defaultArgs = {
    type: 'text',
    name: 'name',
    value: ''
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
    ...defaultArgs,
    placeholder: 'Enter your name'
};

export const WithoutPlaceholder = Template.bind({});
WithoutPlaceholder.args = {
    ...defaultArgs
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
    ...defaultArgs,
    value: 'Default Value'
};

export const WithLabel = Template.bind({});
WithLabel.args = {
    ...defaultArgs,
    label: 'Name'
};

export const WithLabelAndPlaceholder = Template.bind({});
WithLabelAndPlaceholder.args = {
    ...WithLabel.args,
    placeholder: 'Enter a name'
};

export const WithStyle = Template.bind({});
WithStyle.args = {
    ...WithLabelAndPlaceholder.args,
    style: { backgroundColor: 'red', color: 'white' }
};