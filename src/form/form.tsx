import React, {
    useRef,
    useContext
  } from "react";

import { FormContext, FormContextType, GenericHTMLInput, ObjectType } from '../Forminho';



const getRefKeys = (refs: {[key:string]: HTMLInputElement}): Array<string> => Object.keys(refs).filter(key => key !== 'undefined');

// const getValuesFromRefs = (refs: {[key:string]: HTMLInputElement}) => {
//     // Oddly, the current value of the ref has a undefined: undefined key, value par
//     const valuesFromRefs = getRefKeys(refs).reduce((valuesObj, key) => {
//         console.log('KEY ', key, valuesObj)
//         if (key !== undefined) valuesObj[key] = refs[key].value;
//         return valuesObj;
//     }, {});
//     return valuesFromRefs;
// }


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

const getValuesFromFormRef = (formRef: React.MutableRefObject<HTMLFormElement | null>, initialValues: ObjectType) => {
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
        console.log('Updating liveValues: ', context.liveValuesRefs[fieldName])
        if (context.liveValuesRefs[fieldName]) {
            console.log('TEM NO LIVE VALUE')
            const liveValueSpan = context.liveValuesRefs[fieldName].current as HTMLSpanElement;
            const fieldRefCurrent = context.fieldRefs[fieldName].current as GenericHTMLInput;
            liveValueSpan.innerText = fieldRefCurrent.value;
            console.log(liveValueSpan.innerText)
        }
    };
  
    // const onChange = (event) => {
    //   const name = event.target.name;
    // //   console.log("FORM ONCHANGE ---> ", name);
    // //   console.log("CONTEXT IN FORM: ", context, context.formRef.current);
    //   updateLiveValue(name);
    // //   console.log(
    // //     "Updated context values: ",
    // //     context.liveValues[name].current.innerText,
    // //     context.fieldRefs[name].current.value
    // //   );
  
    // //   console.log("CALLING PROPS ONCHANGE");
    //   props.onChange(event);
    // };
  
    // useEffect(() => {
    //   console.log("Form Effect -> ", formRef);
    // });

    // const formRef = useRef(null);
    // console.log('initialValues ', initialValues)
    // console.log(Object.keys(initialValues))
    // const initialErrors = Object.keys(initialValues).reduce((errorsObj, key) => {
    //     // console.log('KEY ', key, errorsObj)
    //     errorsObj[key] = null;
    //     return errorsObj;
    // }, {});
    // const errors = useRef(initialErrors);

    // const formHandler = useForminhoHandler({onSubmitHandler, errors, refs, formRef, contextValue, onLiveErrorFeedback, setCurrentValues});

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


  
    console.log("REF DO FORM: ", formRef);
    return (
      <form ref={formRef} onSubmit={onSubmit} onChange={onChange}>
        {props.children}
        {/* <button>Send</button> */}
      </form>
    );
  };

export default Form;