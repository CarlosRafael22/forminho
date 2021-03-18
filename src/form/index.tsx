import React, { useRef, useContext, useState, useImperativeHandle } from "react";
import { FormContext, FormContextType } from '../Forminho';
import { getValuesFromFormRef } from './utils';
import Button from '../button';
import Alert from '../alert';

type IncrementedRef = {
    // liveValues: Object | undefined,
    current: HTMLFormElement | null
}

const Form = React.forwardRef<IncrementedRef, FormProps>(({
    initialValues,
    onSubmitHandler,
    onChangeHandler,
    onLiveErrorFeedback,
    onValidationHandler,
    children,
    submitButtonText
}, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const context = useContext(FormContext) as FormContextType;
    const [error, setError] = useState(undefined);

    context.formRef = formRef;
    context.initialValues = initialValues || {};

    useImperativeHandle(ref, () => ({
        current: formRef.current,
        // liveValues
    }));

    const onChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        // updateLiveValue(context, name);

        const formRefValues = getValuesFromFormRef(context.formRef, context.initialValues);
        // console.log(formRefValues)
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
        const formRefValues = getValuesFromFormRef(context.formRef, context.initialValues);
        // onSubmitHandler(formRefValues);
        console.log('formRefValues NO SUBMIT: ', formRefValues)
        if (validatedValues(formRefValues)) {
            if(onSubmitHandler) onSubmitHandler(formRefValues);
        }
    }

    // Checks whether we need to render the buttons coming as children or the default one
    let willRenderDefaultButton = true;
    React.Children.map(children, (child: React.ReactElement<any>) => {
        if (React.isValidElement(child)) {
            const { type } = child;
            if (type === Button) {
                willRenderDefaultButton = false;
            }
        }
    });
  
    console.log("O FORWARD REF 2: ", ref);
    console.log('Rendering form with context: ', context)
    return (
        <FormContext.Provider value={context}>
            <form ref={formRef} onSubmit={onSubmit} onChange={onChange}>
                {error && <Alert text={error as unknown as string} />}
                {children}
                {willRenderDefaultButton && (submitButtonText ? <Button text={submitButtonText} /> : <Button />)}
            </form>
        </FormContext.Provider>
    );
  });

export default Form;