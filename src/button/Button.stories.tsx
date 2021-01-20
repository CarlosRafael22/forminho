import React from 'react';
import { Story, Meta } from '@storybook/react';
import Button from '.';

export default {
    title: 'Simple-Form/Button',
    component: Button
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Custom = Template.bind({});
Custom.args = {
    text: 'Send',
    style: {
        backgroundColor: 'black',
        color: 'white'
    }
};