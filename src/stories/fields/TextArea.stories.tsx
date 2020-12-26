import React from 'react';
import { Meta } from '@storybook/react';
import TextArea from '../../fields/textarea';

export default {
    title: 'Simple-Form/TextArea',
    component: TextArea
} as Meta;

const Template = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
    value: ''
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
    value: '',
    placeholder: 'Type something here...'
};

export const WithLabel = Template.bind({});
WithLabel.args = {
    ...WithPlaceholder.args,
    label: 'Describe what you are thinking'
};

export const WithCustomStyle = Template.bind({});
WithCustomStyle.args = {
    ...WithPlaceholder.args,
    style: { backgroundColor: 'red', color: 'white' }
};