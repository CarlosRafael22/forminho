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

export const withPlaceholder = Template.bind({});
withPlaceholder.args = {
    ...defaultArgs,
    placeholder: 'Enter your name'
};

export const withoutPlaceholder = Template.bind({});
withoutPlaceholder.args = {
    ...defaultArgs
};

export const withDefaultValue = Template.bind({});
withDefaultValue.args = {
    ...defaultArgs,
    value: 'Default Value'
};

export const withLabel = Template.bind({});
withLabel.args = {
    ...defaultArgs,
    label: 'Name'
};

export const withLabelAndPlaceholder = Template.bind({});
withLabelAndPlaceholder.args = {
    ...withLabel.args,
    placeholder: 'Enter a name'
};