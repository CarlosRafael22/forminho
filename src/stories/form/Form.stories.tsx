import React from 'react';
import { Story, Meta } from '@storybook/react';
import Form from '../../form';
import { withoutPlaceholder, withPlaceholder, withLabel, withLabelAndPlaceholder } from '../fields/InputField.stories';
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

export const withoutFields = Template.bind({});
withoutFields.args = {
    ...defaultArgs,
    items: []
};

export const withFields = Template.bind({});
withFields.args = {
    ...defaultArgs,
    items: [withPlaceholder.args, withoutPlaceholder.args]
};

export const withFieldsAndLabels = Template.bind({});
withFieldsAndLabels.args = {
    ...defaultArgs,
    items: [withLabel.args, withLabel.args]
};

export const withFieldsAndLabelsAndPlaceholders = Template.bind({});
withFieldsAndLabelsAndPlaceholders.args = {
    ...defaultArgs,
    items: [withLabelAndPlaceholder.args, withLabelAndPlaceholder.args]
};
