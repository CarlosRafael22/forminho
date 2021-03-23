import { FormContextType, ObjectType } from '../Forminho';

export const getRefKeys = (refs: {[key:string]: any}): Array<string> => Object.keys(refs).filter(key => key !== 'undefined');

export const handleFieldError = (contextValue: FormContextType) => {
    const setFieldError = (fieldName: string, errorMessage: string) => {
        // Check whether the field is on focus
        // If its not on focus then we dont set the errorText otherwise all fields could show errors before they were interacted with
        // console.log('CONTEXT NO HANDLE FIELD', contextValue)
        const { current: currentElement } = contextValue.fieldRefs[fieldName];
        const { current: currentErrorSpan } = contextValue.errorRefs[fieldName];
        // console.log('CURRENT FIELD ', currentElement)
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

// onLiveErrorFeedbackObject
// {
//     firstName: validate('firstName').min(6, 'Must have more than 6 caracters').max(20, 'Must have 20 at most'),
//     lastName: validate().min(6, 'Must have more than 6 caracters')
// }
// return [
//     validate('firstName').min(6, 'Must have more than 6 caracters').max(20, 'Must have 20 at most'),
//     validate('lastName').min(6, 'Must have more than 6 caracters').max(20, 'Must have 20 at most')
// ]
// export const validateFields = (onLiveErrorFeedbackObject: any, formRefValues: any, context: FormContextType) => {
//     const { setFieldError, clearFieldError } = handleFieldError(context)
//     const errorFeedbackKeys = Object.keys(onLiveErrorFeedbackObject)
//     for (const key of errorFeedbackKeys) {
//         new fieldValidator(formRefValues[key], key, setFieldError, clearFieldError)
//     }
// }
// const validate = (fieldName: string) => new fieldValidator('', fieldName, mockedSet, mockedClear)
// if(onLiveErrorFeedback) {
//     const validationsArray = onLiveErrorFeedback(validate)
//     validationsArray.forEach(validation: => validation())
// }
// export const validateFields = (validationsArray: any[], formRefValues: any, context: FormContextType) => {
//     const { setFieldError, clearFieldError } = handleFieldError(context)
//     // const errorFeedbackKeys = Object.keys(onLiveErrorFeedbackObject)
//     validationsArray.forEach(validation => validation())
//     for (const key of errorFeedbackKeys) {
//         new fieldValidator(formRefValues[key], key, setFieldError, clearFieldError)
//     }
// }

// const validate = () => fieldValidator(formRefValues[key], key, setFieldError, clearFieldError)
// if(onLiveErrorFeedback) onLiveErrorFeedback(formRefValues, context);

// const onLiveError = (validate: Function) => {
//     return {
//         firstName: validate().min(6, 'Must have more than 6 caracters').max(20, 'Must have 20 at most'),
//         lastName: validate().min(6, 'Must have more than 6 caracters')
//     }
// }

// const validate = () => ()

// errorHasBeenSet has true as default so that its not called in the first rule call in the chain, otherwise it would call clearFieldError in the first rule
// export const fieldValidator = (field: any, fieldName: string, setFieldError: Function, clearFieldError: Function, errorHasBeenSet = true) => ({
//     min: (limit: number, errorMessage: string) => {
//         let errorWasSet = false
//         if (field.length < limit) {
//             errorWasSet = true
//             setFieldError(fieldName, errorMessage)
//         } else {
//             // If an error has been set for the previous rule them we dont clear
//             // We only clear the error on the last rule if any error hasnt been set
//             console.log('ERRRO: ', errorWasSet, errorHasBeenSet)
//             if (!errorHasBeenSet) clearFieldError(fieldName)
//         }
//         return fieldValidator(field, fieldName, setFieldError, clearFieldError, errorWasSet)
//     },
//     max: (limit: number, errorMessage: string) => {
//         let errorWasSet = false
//         if (field.length > limit) {
//             errorWasSet = true
//             setFieldError(fieldName, errorMessage)
//         } else {
//             // If an error has been set for the previous rule them we dont clear
//             // We only clear the error on the last rule if any error hasnt been set
//             console.log('ERRRO: ', errorWasSet, errorHasBeenSet)
//             if (!errorHasBeenSet) clearFieldError(fieldName)
//         }
//         return fieldValidator(field, fieldName, setFieldError, clearFieldError, errorWasSet)
//     },
//     required: (errorMessage?: string) => {
//         let errorWasSet = false
//         if (!field || field.length == 0) {
//             errorWasSet = true
//             setFieldError(fieldName, errorMessage ? errorMessage : `${fieldName} should be provided`)
//         } else {
//             // If an error has been set for the previous rule them we dont clear
//             // We only clear the error on the last rule if any error hasnt been set
//             console.log('ERRRO: ', errorWasSet, errorHasBeenSet)
//             if (!errorHasBeenSet) clearFieldError(fieldName)
//         }
//         return fieldValidator(field, fieldName, setFieldError, clearFieldError, errorWasSet)
//     }
// })

// export function fieldValidator (field: any, fieldName: string, setFieldError: Function, clearFieldError: Function) {

//     let errorWasSet = false
//     let errorHasBeenSet = false
//     console.log('O THIS INICIAL: ', this)
    
//     return {
//         min: function (limit: number, errorMessage: string) {
//             if (field.length < limit) {
//                 errorHasBeenSet = true
//                 setFieldError(fieldName, errorMessage)
//             } else {
//                 // If an error has been set for the previous rule them we dont clear
//                 // We only clear the error on the last rule if any error hasnt been set
//                 console.log('ERRRO: ', errorWasSet, errorHasBeenSet)
//                 if (!errorHasBeenSet) clearFieldError(fieldName)
//             }
//             console.log('O THIS: ', this)
//             return this
//         },
//         max: function (limit: number, errorMessage: string) {
//             if (field.length > limit) {
//                 errorHasBeenSet = true
//                 setFieldError(fieldName, errorMessage)
//             } else {
//                 // If an error has been set for the previous rule them we dont clear
//                 // We only clear the error on the last rule if any error hasnt been set
//                 console.log('ERRRO: ', errorWasSet, errorHasBeenSet)
//                 if (!errorHasBeenSet) clearFieldError(fieldName)
//             }
//             console.log('O THIS: ', this)
//             return this
//         },
//         required: function (errorMessage?: string) {
//             if (!field || field.length == 0) {
//                 errorHasBeenSet = true
//                 setFieldError(fieldName, errorMessage ? errorMessage : `${fieldName} should be provided`)
//             } else {
//                 // If an error has been set for the previous rule them we dont clear
//                 // We only clear the error on the last rule if any error hasnt been set
//                 console.log('ERRRO: ', errorWasSet, errorHasBeenSet)
//                 if (!errorHasBeenSet) clearFieldError(fieldName)
//             }
//             console.log('O THIS: ', this)
//             return this
//         }
//     }
// }

export class FieldValidator {
    field: any
    fieldName: string
    setFieldError: Function
    clearFieldError: Function
    errorHasBeenSet = false

    constructor (field: any, fieldName: string, setFieldError: Function, clearFieldError: Function) {
        this.field = field
        this.fieldName = fieldName
        this.setFieldError = setFieldError
        this.clearFieldError = clearFieldError
        console.log('NO CONSTRUCTOR:  ', field, fieldName)
    }

    // let errorWasSet = false
    // let errorHasBeenSet = false
    // console.log('O THIS INICIAL: ', this)
    
    min (limit: number, errorMessage: string) {
        console.log('NO MIN:  ', this.field, this.fieldName)
        if (this.field.length < limit) {
            this.errorHasBeenSet = true
            this.setFieldError(this.fieldName, errorMessage)
        } else {
            // If an error has been set for the previous rule them we dont clear
            // We only clear the error on the last rule if any error hasnt been set
            console.log('ERRRO: ', this.errorHasBeenSet)
            if (!this.errorHasBeenSet) this.clearFieldError(this.fieldName)
        }
        // console.log('O THIS: ', this)
        return this
    }

    max (limit: number, errorMessage: string) {
        console.log('NO MAX:  ', this.field, this.fieldName)
        if (this.field.length > limit) {
            this.errorHasBeenSet = true
            this.setFieldError(this.fieldName, errorMessage)
        } else {
            // If an error has been set for the previous rule them we dont clear
            // We only clear the error on the last rule if any error hasnt been set
            console.log('ERRRO: ', this.errorHasBeenSet)
            if (!this.errorHasBeenSet) this.clearFieldError(this.fieldName)
        }
        // console.log('O THIS: ', this)
        return this
    }

    required (errorMessage?: string) {
        console.log('NO REQUIRED:  ', this.field, this.fieldName)
        if (!this.field || this.field.length == 0) {
            this.errorHasBeenSet = true
            this.setFieldError(this.fieldName, errorMessage ? errorMessage : `${this.fieldName} should be provided`)
        } else {
            // If an error has been set for the previous rule them we dont clear
            // We only clear the error on the last rule if any error hasnt been set
            console.log('ERRRO: ', this.errorHasBeenSet)
            if (!this.errorHasBeenSet) this.clearFieldError(this.fieldName)
        }
        // console.log('O THIS: ', this)
        return this
    }
}

export const getValuesFromFormRef = (formRef: React.MutableRefObject<HTMLFormElement | null>, initialValues: ObjectType): ObjectType => {
    const initialValuesKeys = getRefKeys(initialValues);
    // console.log('KEYS ', initialValuesKeys)
    const values = initialValuesKeys.reduce((valuesObj, key) => {
        // console.log('KEY FORM REF', key, formRef.current[key]?.type, formRef.current[key])
        const { current } = formRef as React.MutableRefObject<HTMLFormElement>;
        // console.log(current)
        const currentRef = current[key];
        // console.log(currentRef)
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

export const getUpdatedLiveValuesFromRefs = (liveValues: Object, formRefValues: Object) => {
    let updatedLiveValues = {}
    Object.keys(liveValues).forEach(field => {
        updatedLiveValues[field] = formRefValues[field]
    })
    return updatedLiveValues
}

export const checkHasFilledValues = (formRefValues: Object, initialValues: Object): boolean => {
    for (const key of Object.keys(initialValues)) {
        if (typeof initialValues[key] === 'string') {
            if (formRefValues[key] != '') return true
        } else if (Array.isArray(initialValues[key])) {
            if (formRefValues[key].length > 0) return true
        } else if (typeof initialValues[key] === 'boolean') {
            // Regardless of the value, if it has an boolean we assume its been filled
            return true
        }
    }
    return false
}