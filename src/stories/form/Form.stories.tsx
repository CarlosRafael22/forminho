import React from 'react';
import { Story, Meta } from '@storybook/react';
import Form from '../../form';
import { WithPlaceholder, WithLabel, WithLabelAndPlaceholder } from '../fields/InputField.stories';
import InputField from '../../fields/InputField';

export default {
    title: 'Example/Form',
    component: Form
} as Meta;

type TemplateProps = {items: Array<InputFieldProps>, args: FormHandlerHookType};

const Template: Story<TemplateProps> = ({items, ...args}: TemplateProps) => (
    <Form {...args}>
        {
            items.map((item: InputFieldProps) => (
                <InputField {...item} />
            ))
        }
    </Form>
);

const defaultArgs = {
    initialValues: {name:''},
    onSubmitHandler: () => {},
};

export const WithoutFields = Template.bind({});
WithoutFields.args = {
    ...defaultArgs,
    items: []
};

export const WithFields = Template.bind({});
WithFields.args = {
    ...defaultArgs,
    items: [WithPlaceholder.args, WithPlaceholder.args]
};

export const WithFieldsAndLabels = Template.bind({});
WithFieldsAndLabels.args = {
    ...defaultArgs,
    items: [WithLabel.args, WithLabel.args]
};

export const WithFieldsAndLabelsAndPlaceholders = Template.bind({});
WithFieldsAndLabelsAndPlaceholders.args = {
    ...defaultArgs,
    items: [WithLabelAndPlaceholder.args, WithLabelAndPlaceholder.args]
};
