import React from 'react';
import { Story, Meta } from '@storybook/react';
import Field from '../../fields';


export default {
    title: 'Simple-Form/Radio Input',
    component: Field.Radio
} as Meta;

const Template: Story<RadioProps> = (args) => (<Field.Radio {...args} />);

export const Default = Template.bind({});
Default.args = {
    name: 'team',
    value: 'Chelsea',
    label: 'Chelsea'
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
    ...Default.args,
    style: { backgroundColor: 'red', padding: '10px', fontWeight: '700', color: 'white' }
};