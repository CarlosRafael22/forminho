import React, { useRef, useContext, useState, useImperativeHandle } from "react";
import { FormContext, FormContextType } from '../Forminho';
import { getValuesFromFormRef, checkHasFilledValues, FieldValidator, handleFieldError } from './utils';
import { getStylingProps } from '../utils/styling'
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
    submitButtonText,
    style,
    css,
    className
}, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const context = useContext(FormContext) as FormContextType;
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const { setFieldError, clearFieldError } = handleFieldError(context)

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
        // console.log('Updating context.currentValues')
        context.currentValues = formRefValues;
        // console.log(context)

        const validate = (fieldName: string) => new FieldValidator(formRefValues[fieldName], fieldName, setFieldError, clearFieldError)
        console.log('O VALIDAAAATEEEE: ', validate, formRefValues)
        if(onLiveErrorFeedback) onLiveErrorFeedback(validate);
        console.log('CALLING ONCHANGE FROM THE SIGNUP')
        if(onChangeHandler) onChangeHandler(event, formRefValues);
    };

    const validatedValues = (values: ObjectType) => {
        if (onValidationHandler) {
            const expectedErrors = onValidationHandler(values)
            if (expectedErrors && expectedErrors.length > 0) {
                setErrors(expectedErrors)
                return false
            } else {
                setErrors(undefined)
                return true
            }
        }
        return true
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formRefValues = getValuesFromFormRef(context.formRef, context.initialValues);
        // onSubmitHandler(formRefValues);
        // If formRefValues equals to initialValues then the form hasnt been filled and we should call submit
        if (!checkHasFilledValues(formRefValues, initialValues)) {
            setErrors(['Please fill up the form.'])
            return
        }

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

    const styleProps = getStylingProps({}, { style, css, className })
    return (
        <FormContext.Provider value={context}>
            <form ref={formRef} onSubmit={onSubmit} onChange={onChange} {...styleProps}>
                {(errors && errors.length > 0) && (
                    errors.map(error => <Alert text={error} />)
                )}
                {children}
                {willRenderDefaultButton && (submitButtonText ? <Button text={submitButtonText} /> : <Button />)}
            </form>
        </FormContext.Provider>
    );
  });

export default Form;