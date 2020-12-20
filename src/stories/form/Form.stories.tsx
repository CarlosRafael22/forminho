import React from 'react';
import { Story, Meta } from '@storybook/react';
import Form from '../../form';
import { withoutPlaceholder, withPlaceholder } from '../fields/InputField.stories';
import InputField from '../../fields/InputField';

export default {
    title: 'Example/Form',
    component: Form
} as Meta;

// const Template: Story<FormProps> = (args) => (
//     <Form {...args}></Form>
// );

// export const withoutFields = Template.bind({});
// withoutFields.args = {
//     initialValues: {name:''},
//     onSubmitHandler: () => {}
// };

// export const withFields = Template.bind({});
// withFields.args = {
//     initialValues: {name:''},
//     onSubmitHandler: () => {},
//     children: [<withPlaceholder {...withPlaceholder.args} />, <withPlaceholder {...withPlaceholder.args} />]
// };

const Template = ({items, ...args}: {items: Array<InputFieldProps>, args: FormProps}) => (
    <Form {...args}>
        {
            items.map((item: InputFieldProps) => (
                <InputField {...item} />
            ))
        }
    </Form>
);

export const withoutFields = Template.bind({});
withoutFields.args = {
    initialValues: {name:''},
    onSubmitHandler: () => {},
    items: []
};

export const withFields = Template.bind({});
withFields.args = {
    initialValues: {name:''},
    onSubmitHandler: () => {},
    items: [withPlaceholder.args]
};

