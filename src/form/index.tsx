import React, { useRef, useContext } from "react";
import { FormContext, FormContextType } from '../Forminho';
import { getValuesFromFormRef, updateLiveValue } from './utils';
import Button from '../button';

const Form = ({ initialValues, onSubmitHandler, onChangeHandler, onLiveErrorFeedback, children, submitButtonText }: FormProps) => {
    const formRef = useRef(null);
    const context = useContext(FormContext) as FormContextType;
    // console.log("Context in the Form: ", context);
    context.formRef = formRef;
    context.initialValues = initialValues || {};
    console.log("Context in the Form: ", context);

    const onChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        console.log('CHANGE')
        console.log(event.target.value)
        const { name } = event.target;
        console.log(name)

        updateLiveValue(context, name);

        const formRefValues = getValuesFromFormRef(context.formRef, context.initialValues);
        console.log(formRefValues)

        console.log('Updating context.currentValues')
        context.currentValues = formRefValues;
        console.log(context)

        if(onLiveErrorFeedback) onLiveErrorFeedback(formRefValues, context);
        console.log('CALLING ONCHANGE FROM THE SIGNUP')
        if(onChangeHandler) onChangeHandler(event);
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('SUBMIT')
        const formRefValues = getValuesFromFormRef(formRef, context.initialValues);
        onSubmitHandler(formRefValues);
    }

    // Checks whether we need to render the buttons coming as children or the default one
    let willRenderDefaultButton = true;
    React.Children.map(children, (child: React.ReactElement<any>) => {
        if (React.isValidElement(child)) {
            console.log('CHILD')
            // const { type } = child;
            console.log(child.type)
            if (child.type === Button) {
                willRenderDefaultButton = false;
            }
        }
    });
  
    console.log("REF DO FORM: ", formRef);
    console.log('Rendering form...')
    return (
      <form ref={formRef} onSubmit={onSubmit} onChange={onChange}>
        {children}
        {willRenderDefaultButton && (submitButtonText ? <Button text={submitButtonText} /> : <Button />)}
      </form>
    );
  };

export default Form;