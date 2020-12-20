import React from 'react';
import { Story, Meta } from '@storybook/react';

import InputField from '../../fields/InputField';

export default {
    title: 'Example/InputField',
    component: InputField,
} as Meta;

const Template: Story<InputFieldProps> = (args) => <InputField {...args} />;

export const withPlaceholder = Template.bind({});
withPlaceholder.args = {
    type: 'text',
    name: 'name',
    placeholder: 'Enter your name',
    value: ''
};

export const withoutPlaceholder = Template.bind({});
withoutPlaceholder.args = {
    type: 'text',
    name: 'name',
    value: ''
};

export const withDefaultValue = Template.bind({});
withDefaultValue.args = {
    type: 'text',
    name: 'name',
    value: 'default value'
};