import React from 'react';
import { Story, Meta } from '@storybook/react';
import Form from '../../form';
import { WithPlaceholder, WithLabel, WithLabelAndPlaceholder } from '../fields/InputField.stories';
import Field from '../../fields';
import { Custom as CustomButton } from '../button/Button.stories';
import Button from '../../button';
import { Default as DefaultSelect } from '../fields/Select.stories';

export default {
    title: 'Simple-Form/Form',
    component: Form
} as Meta;

interface TemplateProps extends FormHandlerHookType {
    items: Array<InputFieldProps | ButtonProps>
}

// inerface TemplateProps extends FormHa = {items: Array<InputFieldProps | ButtonProps>, args: FormHandlerHookType};

// Using Type Guard to check type of an interface
const isInputFieldProps = (props: InputFieldProps | ButtonProps): props is InputFieldProps => {
    return (props as InputFieldProps).name !== undefined;
};

const Template: Story<TemplateProps> = ({items, ...args}: TemplateProps) => (
    <Form {...args}>
        {
            items.map((item: any, idx: number) => {
                if(isInputFieldProps(item)) {
                    return (<Field.Input {...item} key={idx} />)
                } else {
                    return (<Button {...item} key={idx} />)
                }
            })
        }
    </Form>
);

const defaultArgs: FormHandlerHookType = {
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

export const WithSubmitButtonText = Template.bind({});
WithSubmitButtonText.args = {
    ...WithFieldsAndLabelsAndPlaceholders.args,
    submitButtonText: 'Confirm submission'
};

export const WithButtonAsChild = Template.bind({});
WithButtonAsChild.args = {
    ...defaultArgs,
    items: [WithLabelAndPlaceholder.args, WithLabelAndPlaceholder.args, CustomButton.args]
};

export const WithSelect = Template.bind({});
WithSelect.args = {
    ...defaultArgs,
    items: [DefaultSelect.args]
};