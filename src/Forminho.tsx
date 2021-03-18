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
    fieldRefs: RefsObject<GenericHTMLInput | null>,
    errorRefs: RefsObject<HTMLSpanElement | null>,
    initialValues: ObjectType,
    currentValues: ObjectType
}

export const FormContext = createContext({
  formRef: {},
  fieldRefs: {},
  errorRefs: {},
  initialValues: {},
  currentValues: {}
});