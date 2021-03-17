import React, { useRef, useContext, useState, useEffect } from "react";
import { FormContext, FormContextType } from '../Forminho';
import { getValuesFromFormRef, updateLiveValue, getUpdatedLiveValuesFromRefs } from './utils';
import Button from '../button';
import Alert from '../alert';

const getInitialLiveValues = (liveValuesStrings?: string[]) => {
    if (!liveValuesStrings) return null
    return liveValuesStrings.reduce((previous, current) => {
        return { ...previous, [current]: '' }
    }, {})
}


const Form = ({
    initialValues,
    onSubmitHandler,
    onChangeHandler,
    onLiveErrorFeedback,
    onValidationHandler,
    children,
    submitButtonText,
    withLiveValues
}: FormProps) => {
    const formRef = useRef(null);
    const context = useContext(FormContext) as FormContextType;
    const [error, setError] = useState(undefined);
    const [liveValues, setLiveValues] = useState<Object | undefined>(undefined);
    
    useEffect(() => {
        const initialLiveValues = getInitialLiveValues(withLiveValues);
        console.log('initialLiveValues NO DIDMOUNT: ', initialLiveValues)
        if (initialLiveValues !== null) {
            setLiveValues(initialLiveValues)
        }
    }, [])
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

        // Vai atualizar o liveValues se for preciso
        if(liveValues) {
            const updatedLiveValues = getUpdatedLiveValuesFromRefs(liveValues, formRefValues)
            console.log('updatedLiveValues NO ONCHANGE: ', updatedLiveValues)
            if (liveValues !== updatedLiveValues) {
                console.log('DIFERENTE DO STATE')
                setLiveValues(updatedLiveValues)
            } else {
                console.log('MESMO QUE STATE')
            }
            // updateLiveValueState(updatedLiveValues)
        }
        console.log('OS LIVEVALUES: ', liveValues)


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
  
    console.log("REF DO FORM: ", formRef);
    console.log('Rendering form...')
    console.log('O LIVE VALUE STATE: ', liveValues)
    return (
      <form ref={formRef} onSubmit={onSubmit} onChange={onChange}>
        {error && <Alert text={error as unknown as string} />}
        {children}
        {willRenderDefaultButton && (submitButtonText ? <Button text={submitButtonText} /> : <Button />)}
      </form>
    );
  };

export default Form;