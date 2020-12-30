import React, { useRef, createContext } from 'react';
// import Input from './InputField';

type contextType = {
    inputRefs?: initialValuesType,
    errorRefs?: initialValuesType
};

export const FormContext = createContext<contextType>({});

export type initialValuesType = {
    [key: string]: any
}

type FormHandlerHookType = {
    onSubmitHandler: Function,
    errors: { current: initialValuesType },
    refs: { current: initialValuesType },
    formRef: any,
    contextValue: contextType
}

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

const useForminhoHandler = ({onSubmitHandler, refs, formRef, contextValue}: FormHandlerHookType) => {

    const onChangeHandler = (event: any) => {
        console.log('CHANGE')
        // console.log(event.target)
        console.log(event.target.value)
        console.log(event.target.name)

        console.log('CONTEXT VALUES')
        console.log(contextValue)

        if(event.target.name == 'firstName') {
            console.log(event.target.value.length)
            const { errorRefs } = contextValue as { errorRefs: initialValuesType};
            if (event.target.value.length < 6) {
                console.log('Error: ', errorRefs['firstName'])
                console.log('Error: ', errorRefs['firstName'].current)
                errorRefs['firstName'].current.innerText = 'Cant be less than 6 caracters';
                // refs.current['firstName'].value = 'Cant be less than 6 caracters';
                console.log('ERROS: ', contextValue.errorRefs)
            } else {
                errorRefs['firstName'].current.innerText = '';
            }
        }
    };

    const getValuesFromFormRef = (formRef: any) => {
        const initialValuesKeys = getRefKeys(refs.current);
        // console.log('KEYS ', initialValuesKeys)
        const values = initialValuesKeys.reduce((valuesObj, key) => {
            // console.log('KEY FORM REF', key, formRef.current[key]?.type, formRef.current[key])
            const currentRef = formRef.current[key];
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

    const submitHandler = (event: any) => {
        event.preventDefault();
        console.log('SUBMIT')
        const formRefValues = getValuesFromFormRef(formRef);
        onSubmitHandler(formRefValues);
    }

    return {
        onChangeHandler,
        submitHandler
    };
}

interface FormProps extends FormHandlerHookType {
    initialValues: initialValuesType,
    children: Array<React.ReactElement>
}

const Form = ({initialValues, onSubmitHandler, children}: FormProps) => {
    const refs = useRef(initialValues);
    const formRef = useRef<HTMLFormElement>(null);
    // console.log('initialValues ', initialValues)
    // console.log(Object.keys(initialValues))
    const initialErrors = Object.keys(initialValues).reduce((errorsObj, key) => {
        // console.log('KEY ', key, errorsObj)
        errorsObj[key] = null;
        return errorsObj;
    }, {});
    const errors = useRef(initialErrors);
    // console.log(initialValues)
    // console.log('INITIAL REFS', refs)
    const contextValue = {
        inputRefs: {},
        errorRefs: {}
    };
    const formHandler = useForminhoHandler({onSubmitHandler, errors, refs, formRef, contextValue});

    // const childrenWithFormProps = React.Children.map(children, child => {
    //     if (React.isValidElement(child)) {
    //         console.log('CHILD')
    //         console.log(child.props)
    //         const { props } = child as any;
    //         const { name: propName } = props;
    //         const refFunction = (input) => refs[propName] = input;
    //         const refCallback = (el) => {
    //             console.log('RefCallback ', el);
    //             refs.current[propName] = el.input;
    //             errors.current[propName] = el.error;
    //         };
    //         const prop = {
    //             ref: refCallback,
    //             onChange: formHandler.onChangeHandler,
    //             defaultValue: initialValues[propName],
    //             error: errors.current[propName],
    //         } as Partial<unknown>;
    //         console.log('PROPS --> ', prop)
    //         const newChild = React.cloneElement(child, prop);
    //         console.log(newChild.props)
    //         return newChild;
    //     };
    // })

    console.log('Rendering')
    console.log(errors)
    console.log(refs)
    console.log(formRef)

    return (
        <FormContext.Provider value={contextValue}>
            <form ref={formRef} className="main-form" onSubmit={formHandler.submitHandler} onChange={formHandler.onChangeHandler}>
            {children}
        </form>
        </FormContext.Provider>
    )
};

export default Form;