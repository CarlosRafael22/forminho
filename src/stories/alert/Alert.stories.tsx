import React from 'react';
import { Story, Meta } from '@storybook/react';
import Alert from '../../alert';


export default {
    title: 'Simple-Form/Alert',
    component: Alert
} as Meta;

const Template: Story<AlertProps> = (args) => <Alert {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    text: 'An error occurred'
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
    text: 'An error occurred',
    style: { backgroundColor: 'red', color: 'white' }
};