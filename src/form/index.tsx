import React, { useRef, useContext } from "react";
import { FormContext, FormContextType, GenericHTMLInput, ObjectType } from '../Forminho';
import Button from '../button';

export const getRefKeys = (refs: {[key:string]: any}): Array<string> => Object.keys(refs).filter(key => key !== 'undefined');

export const handleFieldError = (contextValue: FormContextType) => {
    const setFieldError = (fieldName: string, errorMessage: string) => {
        // Check whether the field is on focus
        // If its not on focus then we dont set the errorText otherwise all fields could show errors before they were interacted with
        console.log('CONTEXT NO HANDLE FIELD', contextValue)
        const { current: currentElement } = contextValue.fieldRefs[fieldName];
        const { current: currentErrorSpan } = contextValue.errorRefs[fieldName];
        console.log('CURRENT FIELD ', currentElement)
        // console.log('IS ON FOCUS? ', onfocus)
        if (document.activeElement === currentElement) {
            if (currentErrorSpan) {
                currentErrorSpan.innerText = errorMessage;
            }
        }
    }
    const clearFieldError = (fieldName: string) => {
        if (contextValue.errorRefs[fieldName].current) {
            const spanCurrent = contextValue.errorRefs[fieldName].current as HTMLSpanElement;
            spanCurrent.innerText = '';
        }
    }

    return {
        setFieldError,
        clearFieldError
    }
};

export const getValuesFromFormRef = (formRef: React.MutableRefObject<HTMLFormElement | null>, initialValues: ObjectType) => {
    const initialValuesKeys = getRefKeys(initialValues);
    // console.log('KEYS ', initialValuesKeys)
    const values = initialValuesKeys.reduce((valuesObj, key) => {
        // console.log('KEY FORM REF', key, formRef.current[key]?.type, formRef.current[key])
        const { current } = formRef as React.MutableRefObject<HTMLFormElement>;
        const currentRef = current[key];
        if (currentRef) {
            // If its a radio or checkbox then it cant be accessed with .value just yet
            if (NodeList.prototype.isPrototypeOf(currentRef)) {
                const elementsArray: Array<HTMLInputElement> = Array.from(currentRef);
                // console.log('elementsArray: ', elementsArray)
                const elementType = elementsArray[0].type;
                if (elementType === 'radio') {
                    // console.log('radioValue: ', currentRef.value)
                    valuesObj[key] = currentRef.value;
                } else if (elementType === 'checkbox') {
                    const checked = elementsArray.filter((input: any) => input.checked);
                    const checkedValues = checked.map((input: any) => input.value);
                    // console.log('checkedValues: ', checkedValues)
                    valuesObj[key] = checkedValues;
                }
            } else if (currentRef.type === 'checkbox') {
                // If its not a node list of radios or checkboxes it can be an isolated checkbox
                // console.log('CAIU CHECKBOX ISOLADO ', currentRef.checked, currentRef.value)
                valuesObj[key] = currentRef.checked;
            } else {
                valuesObj[key] = currentRef.value;
            }
        }
        return valuesObj;
    }, {});
    // console.log('VALUES FROM FORM REF ', values)
    return values;
};


const Form = (props:any) => {
    const formRef = useRef(null);
    const context = useContext(FormContext) as FormContextType;
    // console.log("Context in the Form: ", context);
    context.formRef = formRef;
    context.initialValues = props.initialValues || {};
    console.log("Context in the Form: ", context);
  
    const updateLiveValue = (fieldName: string) => {
        if (context.liveValuesRefs[fieldName]) {
            context.liveValuesRefs[fieldName].forEach(liveValueSpan => {
                // const liveValueSpan = context.liveValuesRefs[fieldName].current as HTMLSpanElement;
                const fieldRefCurrent = context.fieldRefs[fieldName].current as GenericHTMLInput;
                liveValueSpan.innerText = fieldRefCurrent.value;
                console.log(liveValueSpan.innerText)
            });
        }
    };

    const onChange = (event: any) => {
        console.log('CHANGE')
        console.log(event.target.value)
        const { name } = event.target;
        console.log(name)

        updateLiveValue(name);

        const formRefValues = getValuesFromFormRef(context.formRef, context.initialValues);
        console.log(formRefValues)

        console.log('Updating context.currentValues')
        context.currentValues = formRefValues;
        console.log(context)

        if(props.onLiveErrorFeedback) props.onLiveErrorFeedback(formRefValues, context);
        console.log('CALLING ONCHANGE FROM THE SIGNUP')
        if(props.onChangeHandler) props.onChangeHandler(event);
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        console.log('SUBMIT')
        const formRefValues = getValuesFromFormRef(formRef, context.initialValues);
        props.onSubmitHandler(formRefValues);
    }

    let ButtonToRender: React.ReactElement<any>;
    let willRenderDefaultButton = true;

    React.Children.map(props.children, (child: React.ReactElement<any>) => {
        if (React.isValidElement(child)) {
            console.log('CHILD')
            // const { type } = child;
            console.log(child.type)
            if (child.type === Button) {
                ButtonToRender = child;
                willRenderDefaultButton = false;
            }
        }
    });
  
    console.log("REF DO FORM: ", formRef);
    console.log('Rendering form...')
    return (
      <form ref={formRef} onSubmit={onSubmit} onChange={onChange}>
        {props.children}
        {willRenderDefaultButton && (props.submitButtonText ? <Button text={props.submitButtonText} /> : <Button />)}
      </form>
    );
  };

export default Form;