import React, { createContext } from "react";

export type ObjectType = {
    [key: string]: any
}

export type GenericHTMLInput = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type RefsObject<T> = {
    [key: string]: React.MutableRefObject<T>
}

export type FormContextType = {
    formRef: React.MutableRefObject<HTMLFormElement | null>,
    liveValuesRefs: { [key: string]: Array<HTMLSpanElement>},
    fieldRefs: RefsObject<GenericHTMLInput | null>,
    errorRefs: RefsObject<HTMLSpanElement | null>,
    initialValues: ObjectType,
    currentValues: ObjectType
}

export const FormContext = createContext({});

const Forminho = (props: any) => {
  const context = {
    formRef: {},
    liveValuesRefs: {},
    fieldRefs: {},
    errorRefs: {},
    initialValues: {},
    currentValues: {}
  };

  return (
    <FormContext.Provider value={context}>
      <>{props.children}</>
    </FormContext.Provider>
  );
};

export default Forminho;