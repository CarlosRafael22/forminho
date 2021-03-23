import { FormContextType, ObjectType } from '../Forminho';

export const getRefKeys = (refs: {[key:string]: any}): Array<string> => Object.keys(refs).filter(key => key !== 'undefined');

export const handleFieldError = (contextValue: FormContextType) => {
    const setFieldError: setFieldErrorFunction = (fieldName: string, errorMessage: string) => {
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
    const clearFieldError: clearFieldErrorFunction = (fieldName: string) => {
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

export class FieldValidator implements FieldValidatorInterface {
    field: any
    fieldName: string
    setFieldError: setFieldErrorFunction
    clearFieldError: clearFieldErrorFunction
    errorHasBeenSet = false

    constructor (field: any, fieldName: string, setFieldError: setFieldErrorFunction, clearFieldError: clearFieldErrorFunction) {
        this.field = field
        this.fieldName = fieldName
        this.setFieldError = setFieldError
        this.clearFieldError = clearFieldError
    }

    handleSetErrorLogic = (condition: any, errorMessage: any) => {
        if (condition) {
            this.errorHasBeenSet = true
            this.setFieldError(this.fieldName, errorMessage)
        } else {
            // If an error has been set for the previous rule them we dont clear
            // We only clear the error on the last rule if any error hasnt been set
            if (!this.errorHasBeenSet) this.clearFieldError(this.fieldName)
        }
    }
    
    min (limit: number, errorMessage: string) {
        this.handleSetErrorLogic(this.field.length < limit, errorMessage)
        return this
    }

    max (limit: number, errorMessage: string) {
        this.handleSetErrorLogic(this.field.length > limit, errorMessage)
        return this
    }

    required (errorMessage?: string) {
        this.handleSetErrorLogic(!this.field || this.field.length == 0, errorMessage ? errorMessage : `Field should be provided`)
        return this
    }

    lowercase (errorMessage?: string) {
        this.handleSetErrorLogic(this.field != this.field.toLowerCase(), errorMessage ? errorMessage : `Field should be lower case`)
        return this
    }

    uppercase (errorMessage?: string) {
        this.handleSetErrorLogic(this.field != this.field.toUpperCase(), errorMessage ? errorMessage : `Field should be upper case`)
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