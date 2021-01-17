# Forminho

A library to help you create simple forms without having to build the state and error handling logic from scratch.

## Installation

Since this library is currently a study project, the installation is manual.

With the project in your local machine, you would:
1. 'yarn link' inside the forminho folder for yarn to recognize it as a dependency.
2. Install the lib in your project with 'yarn add forminho'
3. 'yarn link' inside your project's node_module/react folder for us to link this react with the react in the forminho
4. 'yarn link react' inside the forminho folder for it to use the react from your own project
Steps 3 and 4 are necessary for us to avoid the 'Invalid Hook Use' error since without it the react from forminho would be different than the one in your project.

## Usage

Currently, the forminho lib has only 4 components which you can use to build simple forms: Forminho, Form, Field and Button.

With them, you can create simple forms customizing both the Field and Button styles and providing less code to handle its logic.

See the example with the explanation below to get a grip on how to create forms.

```javascript
import { Forminho, Form, Field, Button } from 'forminho';

const App = () => {
    const onSubmitHandler = (values) => {
        console.log(values);
    };

        return (
        <div style={{width: '20rem', margin: '0 auto'}}>
            <Forminho>
                <Form
                    initialValues={{
                        firstName: 'Jonh',
                        lastName: 'Doe',
                    }}
                    onSubmitHandler={onSubmitHandler}
                >
                    <Field.Input name='firstName' type='text' label='Your first name' placeholder='Type your first name...' />
                    <Field.Input name='lastName' type='text' label='Your last name' placeholder='Type your last name...' />
                </Form>
            </Forminho>
      </div>
    )
}
```

To create a Form, in its simplest way, you need to provide Fields as well as initialValues and the onSubmitHandler props to the Form component. You also need to wrap the Form component in the Forminho component to be able to have access to its context and for the Form to work correctly.

The 'name' prop in each Field need to be matched on the 'initialValues' prop since the values provided to 'initialValues' will be the initial values to the Fields on the Form state handler.

The 'onSubmitHandler' is another required prop on Form since this tells the component what to do when the user clicks on the standard submit button.

As you can see, there was no Button passed as a child to the Form component since the Form creates a default Button with 'Submit' text and which calls the 'onSubmitHandler'. If you want to customize it you can pass your own Button.

This is the basic example for you to start using 'forminho', for more examples head to the Examples section.

## Components
In this section we are going to show the components and its props.

```
<Forminho />
```
Component that wraps the `<Form />` providing it with the context to handle the "state" of the Field values, the error and field refs and liveValues refs. Forminho actually does not have any state to it and handle the values of each Field with `refs`.

Wrapping the Form in a Forminho component gives you the option to listen to changes in some Fields using the `<LiveValue />`. This way you can access these values to change UI outside the `<Form />`.

```
<Form />
```
##### Props
- initialValues: Object

**Required**. Represents the initial values that every child Field will have. Each field in the 'initialValues' must match one of the 'name' prop in the Field of the Form.

- onSubmitHandler: (values: Object) => void

**Required function**. This props receives the function you would want to execute after the user clicks the submit button. The function receives the most recent values of the Fields. It is called after the onValidationHandler function if this prop was provided, therefore it only executes if the validation provided had no error.

- onValidationHandler: (values: Object) => void

**Optional function**. If you want to have a validation step before the onSubmitHandler you can provide this prop with a function which receives the most recent values of the Fields.

One important thing to notice is that this function should throw Error if the validation you are checking fails. The Error thrown will be caught by the function responsible to deal with errors in the Form component and then it will create an Alert on top of all the fields in the Form showing the error message. If there is no Error thrown then the validation was successful and the values will be passed to 'onSubmitHandler'.

- onLiveErrorFeedback: (values: Object) => void

**Optional function**. For when you want to have a live error feedback while the user is typing. Providing this prop, you can use the `setFieldError` and `clearFieldError` from the `handleFieldError` object to show error messages below the Field when the values that the user typed does not fulfill some logic you determine. This function receives the most recent values of the Fields for you to handle this live error feedbacks.

- onChangeHandler: (event: React.ChangeEvent<HTMLFormElement>, values: Object) => void

**Optional function**. For when you want to change the state or have side effects on the component the `<Form />` is in. It receives the `ChangeEvent` for the `HTMLFormElement`, which you have information about the form target changed, and the most recent values from the Fields.

- submitButtonText: string

**Optional**. Represents the text of the submit button if you want it to have a different text than the default 'Submit'. Passing this prop you don't need to have a Button as a child of the Form, if you only want to modify its text. If you want to customize its style as well then you should have a Button as one of the Form's children.


```
<Field.{Form input type} />

<Field.Input />
<Field.TextArea />
<Field.Select />
<Field.Radio />
<Field.Checkbox />
```

The component to be used for any form field. It uses the dot notation for you to determine which field you are using.

- name: string

**Required**. Represents the name of the Field and should have a matching field on the Form's 'initialValues' object for the state handler hook update its value.

- placeholder: string

**Optional**. Represents the placeholder of the Field.

- label: string

**Optional**. Represents the text in the HTML label on top of the input.

- style: Object

**Optional**. It is the custom style you want to provide the Field with. It receives a javascript object as you would pass it to style a HTML tag on a JSX file.


```
<LiveValue />
```
##### Props
- fieldName: string

**Required**. Correspond to the name of the Field the LiveValue will be listening to for any changes. On every change to the Field value, the LiveValues components associated to it will be updated using `refs` under the hood. This approach was used so there are no re-renders for `useState` updates.

It uses `refs` in the `Forminho` context to be updated so it can only be used inside the `Forminho` component. See an example in the Examples section.


```
<Button />
```

- text: string

**Optional**. The custom text you would want the button to show instead of the default 'Submit'.

- style: Object

**Optional**. It is the custom style you want to provide the Button with. It receives a javascript object as you would pass it to style a HTML tag on a JSX file.


## Examples

Below we provide a few examples using the components and their props to create custom forms.

#### Form with fields validation before submit

```javascript
import { Forminho, Form, Field, } from 'forminho';

const App = () => {
    const onSubmitHandler = (values) => {
        console.log(values)
    };

    const onValidationHandler = (values) => {
        if (values.password.length < 6) {
            throw Error('Password should have more than 6 caracters');
        } else if (values.firstName === values.lastName) {
            throw Error('First and last names should be different');
        } else if (!values.email) {
            throw Error('Should have email')
        }
    }

    return (
        <Forminho>
        <Form
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            }}
            onSubmitHandler={onSubmitHandler}
            onValidationHandler={onValidationHandler}
            submitButtonText='Confirm signup'
        >
            <Field.Input
                type='text'
                name='firstName'
                placeholder='Enter first name'
                label='First name'
                />
            <Field.Input
                type='text'
                name='lastName'
                placeholder='Enter last name'
                label='Last name'
                />
            <Field.Input
                type='email'
                name='email'
                placeholder='Enter email'
                />
            <Field.Input
                type='password'
                name='password'
                placeholder='Enter password'
                />
        </Form>
        </Forminho>
    );
};
```

### Form with live error feedbacks while user is typing

```javascript
import { Forminho, Form, Field, handleFieldError } from 'forminho';

const App = () => {
    const onSubmitHandler = async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
    };

    const onValidationHandler = (values) => {
        if (values.firstName === values.lastName) {
            throw Error('First and last names should be different');
        }
    }

    const onLiveErrorFeedback = (fieldValues, formContext) => {
        const { setFieldError, clearFieldError } = handleFieldError(formContext);
        
        if (fieldValues.firstName.length < 6) {
            setFieldError('firstName', 'Must have more than 6 caracters');
        } else {
            clearFieldError('firstName')
        }
        
        if (fieldValues.lastName.indexOf(' ') < 0) {
            setFieldError('lastName', 'Must have space between names')
        } else {
            clearFieldError('lastName')
        }
    }

    return (
        <Forminho>
        <Form
            initialValues={{
                firstName: '',
                lastName: '',
            }}
            onSubmitHandler={onSubmitHandler}
            onLiveErrorFeedback={onLiveErrorFeedback}
            onValidationHandler={onValidationHandler}
        >
            <Field.Input name='firstName' type='text' label='Your first name' placeholder='Type your first name...' />
            <Field.Input name='lastName' type='text' label='Your last name' placeholder='Type your last name...' />
        </Form>
      </Forminho>
    )
};
```

### Form with onChangeHandler to make state changes to the component Form is in

```javascript

const SimpleSignup = () => {
    const [btVisible, setBtVisibility] = useState(false);

    const onSubmitHandler = async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
    };

    const onChange = (event, currentValues) => {
        !btVisible && setBtVisibility(true);
        console.log("Changing visibility, ", btVisible);
    };

    return (
        <Forminho>
        <Form
            initialValues={{
                firstName: '',
                lastName: '',
            }} 
            onChangeHandler={onChange}
            onSubmitHandler={onSubmitHandler}
        >
            <Field.Input name='firstName' type='text' label='Your first name' placeholder='Type your first name...' />
            <Field.Input name='lastName' type='text' label='Your last name' placeholder='Type your last name...' />
            {btVisible && (
                <Button text={'Now you can submit'} />
            )}
        </Form>
      </Forminho>
    )
}

```

### Using LiveValue to get the content of a Field when it is updated

```javascript

const Form = () => {
    const onSubmitHandler = (values) => {
        console.log(values);
    };

    return (
        <div style={{width: '20rem', margin: '0 auto'}}>
            <Forminho>
                <p>You typed: <LiveValue fieldName='firstName' /></p>
                <Form
                    initialValues={{ firstName: '' }}
                    onSubmitHandler={onSubmitHandler}
                >
                <Field.Input name='firstName' type='text' label='Your first name' placeholder='Type your first name...' />
            </Form>
        </Forminho>
      </div>
    )
}

```