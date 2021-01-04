import React, { useRef, useContext, useEffect } from "react";
import { FormContext, FormContextType } from '../Forminho';

const LiveValue = (props: any) => {
    const spanRef = useRef(null);
    console.log("LiveValue: ", props, props.fieldName);
    // const currentValue = props.name?.current?.value;
    // console.log("value: ", currentValue);

    const context = useContext(FormContext) as FormContextType;
    // console.log("Context in the LiveValue ", context, context.formRef.current);

    useEffect(() => {
        console.log(
        "Effect LiveValue: ",
        // currentValue,
        context.formRef.current,
        spanRef
        );
    });

    context.liveValuesRefs[props.fieldName] = spanRef;
    console.log("Ref in the LiveValue: ", spanRef, context.liveValuesRefs);

    // return <span ref={props.optRef}></span>;
    return <span ref={spanRef}></span>;
};

export default LiveValue;
  