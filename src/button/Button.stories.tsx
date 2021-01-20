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

export const WithCss = Template.bind({})
WithCss.args = {
    text: 'Send with css style',
    css: `
        background-color: red;
        color: white;
        font-size: 16px;

        &:hover {
            background-color: blue;
        }
    `
}