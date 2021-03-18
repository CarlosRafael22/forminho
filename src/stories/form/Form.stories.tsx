import React from 'react';
import { Story, Meta } from '@storybook/react';
import Form from '../../form';
import { WithPlaceholder, WithLabel, WithLabelAndPlaceholder } from '../fields/Input.stories';
import Field from '../../fields';
import { Custom as CustomButton } from '../../button/Button.stories';
import Button from '../../button';
import { WithLabel as WithLabelSelect } from '../fields/Select.stories';
import { Default as DefaultRadio } from '../fields/Radio.stories';
import { Default as DefaultCheckbox } from '../fields/Checkbox.stories';

export default {
    title: 'Simple-Form/Form',
    component: Form
} as Meta;

interface TemplateProps extends FormProps {
    items: Array<InputFieldProps | ButtonProps>
}

const customInputs = ['select', 'checkbox', 'radio'];
type customInput = typeof customInputs[number];

const isCustomInput = (typeChecked: string): typeChecked is customInput => {
    console.log('CUSTOM -> ', customInputs.includes(typeChecked), typeChecked)
    return customInputs.includes(typeChecked);
};

// Using Type Guard to check type of an interface
const isInputFieldProps = (props: ComponentProps): props is InputFieldProps => {
    console.log('PROPS 1-> ', props);
    return ((props as InputFieldProps).type !== undefined) && (!isCustomInput((props as InputFieldProps).type));
};

const isSelectProps = (props: ComponentProps): props is SelectProps => {
    console.log('PROPS 2-> ', props);
    return (props as SelectProps).type === 'select';
};

const isRadioProps = (props: ComponentProps): props is RadioProps => {
    console.log('PROPS 3-> ', props);
    return (props as RadioProps).type === 'radio';
};

const isCheckboxProps = (props: ComponentProps): props is CheckboxProps => {
    console.log('PROPS 4-> ', props);
    return (props as CheckboxProps).type === 'checkbox';
};

const Template: Story<TemplateProps> = ({items, ...args}: TemplateProps) => (
    <Form {...args}>
        {
            items.map((item: any, idx: number) => {
                if(isInputFieldProps(item)) {
                    console.log('CAIU FIELD', item)
                    return (<Field.Input {...item} key={idx} />)
                } else if(isSelectProps(item)) {
                    console.log('CAIU SELECT, ', item)
                    return (<Field.Select {...item} key={idx} />)
                } else if(isRadioProps(item)) {
                    console.log('CAIU RADIO, ', item)
                    return (<Field.Radio {...item} key={idx} />)
                } else if(isCheckboxProps(item)) {
                    console.log('CAIU CHECKBOX, ', item)
                    return (<Field.Checkbox {...item} key={idx} />)
                } else {
                    return (<Button {...item} key={idx} />)
                }
            })
        }
    </Form>
);

const defaultArgs: FormProps = {
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

export const WithTwoButtonAsChildren = Template.bind({});
WithTwoButtonAsChildren.args = {
    ...defaultArgs,
    items: [WithLabelAndPlaceholder.args, WithLabelAndPlaceholder.args, CustomButton.args,
    {...CustomButton.args, text: 'Second send'}]
};

export const WithSelect = Template.bind({});
WithSelect.args = {
    ...defaultArgs,
    items: [WithLabelSelect.args]
};

export const WithRadio = Template.bind({});
WithRadio.args = {
    ...defaultArgs,
    items: [WithPlaceholder.args, DefaultRadio.args, DefaultRadio.args]
};

export const WithCheckbox = Template.bind({});
WithCheckbox.args = {
    ...defaultArgs,
    items: [WithPlaceholder.args, DefaultCheckbox.args]
};

export const WithStyle = Template.bind({});
WithStyle.args = {
    ...WithCheckbox.args,
    style: { backgroundColor: 'blue', color: 'white', width: '50%', margin: '0 auto'}
};

export const WithCss = Template.bind({});
WithCss.args = {
    ...WithCheckbox.args,
    css:`
        background-color: red;
        color: white;
        width: 50%;
        margin: 0 auto;
    `
};

export const WithClassname = Template.bind({});
WithClassname.args = {
    ...WithCheckbox.args,
    className: 'blue-test'
};