import React, { useRef, useContext, useCallback } from "react";
import { FormContext, FormContextType } from '../Forminho';

const LiveValue = (props: any) => {
    const spanRef = useRef(null);
    console.log("LiveValue: ", props, props.fieldName);
    const context = useContext(FormContext) as FormContextType;
    // console.log("Context in the LiveValue ", context, context.formRef.current);
    const ref = useCallback((node) => {
        console.log('Attached liveValue: ', node)
        if (node) {
          if (context.liveValuesRefs[props.fieldName]) {
            console.log("here");
            context.liveValuesRefs[props.fieldName].push(node);
          } else {
            console.log("there");
            context.liveValuesRefs[props.fieldName] = [node];
            // context.liveValues[props.fieldName] = Array(0).fill(spanRef);
            // context.liveValues[props.fieldName] = [spanRef];
          }
        }
      }, [props.fieldName, context.liveValuesRefs]);

    // context.liveValuesRefs[props.fieldName] = spanRef;
    console.log("Ref in the LiveValue: ", spanRef, context.liveValuesRefs);

    return <span data-testid='livevalue' ref={ref}></span>;
};

export default LiveValue;
  