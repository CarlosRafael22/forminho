import React, { useRef, useContext, useState } from "react";
import { FormContext, FormContextType } from '../Forminho';
import { getValuesFromFormRef, updateLiveValue, getValuesFromForm } from './utils';
import Button from '../button';
import Alert from '../alert';

const Form = ({
    initialValues, onSubmitHandler, onChangeHandler, onLiveErrorFeedback, onValidationHandler, children, submitButtonText
}: FormProps) => {
    let formRef = useRef<HTMLFormElement | null>(null);
    // let formRef: React.MutableRefObject<HTMLFormElement | null>;
    const context = useContext(FormContext) as FormContextType;
    const [error, setError] = useState(undefined);
    // console.log("Context in the Form: ", context);
    // context.formRef = formRef;
    context.initialValues = initialValues || {};
    console.log("Context in the Form: ", context);

    // const formElement = document.querySelector('form');
    // const formData = new FormData(formElement)
    let formData: any;

    const onChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        console.log('CHANGE')
        console.log(event.target.value)
        const { name } = event.target;
        console.log(name)

        updateLiveValue(context, name);

        const formRefValues = getValuesFromFormRef(context.formRef, context.initialValues);
        console.log(formRefValues)
        console.log('FORM DATA NO ONCHANGEEEE: ', formData, Array.from(formData.entries()))
        const newFormValues = getValuesFromForm(formRef.current as HTMLFormElement)
        console.log('NEW FORM DATA NO ONCHANGEEEE: ', newFormValues)

        console.log('Updating context.currentValues')
        context.currentValues = formRefValues;
        console.log(context)

        if(onLiveErrorFeedback) onLiveErrorFeedback(formRefValues, context);
        console.log('CALLING ONCHANGE FROM THE SIGNUP')
        if(onChangeHandler) onChangeHandler(event, formRefValues);
    };

    const validatedValues = (values: ObjectType) => {
        try {
            if (onValidationHandler) onValidationHandler(values);
            setError(undefined);
            return true;
        } catch (error) {
            setError(error.message);
            return false;
        }
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('SUBMIT')
        console.log('antes de mandar: ', formRef, context)
        const formRefValues = getValuesFromFormRef(context.formRef, context.initialValues);
        // onSubmitHandler(formRefValues);
        console.log('formRefValues: ', formRefValues)
        if (validatedValues(formRefValues)) {
            if(onSubmitHandler) onSubmitHandler(formRefValues);
        }
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

    const callbackRef = (node: HTMLFormElement) => {
        if (node) {
            console.log('CALLBACK DO FORM REF: ', node)
            formRef.current = node;
            context.formRef = formRef;
            console.log('CONTEXT DPS DO CALLBACK REF: ', context)
            formData = new FormData(node)
            console.log('FORM DATA: ', formData)
            formData.has('email')
            formData.has('firstName')
            //@ts-ignore
            for (let a of formData.entries()) {
                console.log('FORM FIELD: ', a)
            }
            console.log('FORM DATA: ', Array.from(formData.entries()))
        }
    }
  
    // console.log("REF DO FORM: ", formRef);
    console.log('Rendering form...')
    return (
      <form ref={callbackRef} onSubmit={onSubmit} onChange={onChange}>
        {error && <Alert text={error as unknown as string} />}
        {children}
        {willRenderDefaultButton && (submitButtonText ? <Button text={submitButtonText} /> : <Button />)}
      </form>
    );
  };

export default Form;