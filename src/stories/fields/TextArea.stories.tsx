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