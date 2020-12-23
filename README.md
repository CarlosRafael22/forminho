# Simple-Form

A library to help you create simple forms without having to build the state and error handling logic from scratch.

## Installation

Since this library is currently a study project, the installation is manual.

With the project in your local machine, you would:
1. 'yarn link' inside the simple-form folder for yarn to recognize it as a dependency.
2. Install the lib in your project with 'yarn add simple-form'
3. 'yarn link' inside your project's node_module/react folder for us to link this react with the react in the simple-form
4. 'yarn link react' inside the simple-form folder for it to use the react from your own project
Steps 3 and 4 are necessary for us to avoid the 'Invalid Hook Use' error since without it the react from simple-form would be different than the one in your project.

## Usage

Currently, the simple-form lib has only three components which you can use to build simple forms: Form, InputField and Button.

With them, you can create simple forms customizing both the InputField and Button styles and providing less code to handle its logic.

See the example with the explanation below to get a grip on how to create forms.

```javascript
import { Form, InputField, Button } from 'simple-form';

const App = () => {
    const onSubmitHandler = (values) => {
        console.log(values);
    };

    return (
        <Form
            initialValues={{
                firstName: '',
                email: '',
                password: ''
            }}
            onSubmitHandler={onSubmitHandler}
        >
            <InputField
                type='text'
                name='firstName'
                placeholder='Enter first name'
                />
            <InputField
                type='email'
                name='email'
                placeholder='Enter email'
                />
            <InputField
                type='password'
                name='password'
                placeholder='Enter password'
                />
        </Form>
    );
}
```

To create a Form in its simplest way you need to provide InputFields as well as initialValues and the onSubmitHandler props to the Form component.

The 'name' prop in each InputField need to be matched on the 'initialValues' prop since the values provided to 'initialValues' will be the initial value to the InputField on the Form state handler.

The 'onSubmitHandler' is another required prop on Form since this tells the component what to do when the user click on the standard submit button.

This is the basic example for you to start using 'simple-form', for more examples head to the Examples section.

## Components
In this section we are going to show the components and its props.

```
<Form />
```
##### Props
- initialValues: Object

Required. Represents the initial values that every child InputField will have. Each field in the 'initialValues' must match one of the 'name' prop in the InputField of the Form.

- onSubmitHandler: (values: Object) => void

Required function. This props receives the function you would want to execute after the user clicks the submit button. The function receives the most recent values of the InputFields. It is called after the onValidationHandler function if this prop was provided, therefore it only executes if the validation provided had no error.

- onValidationHandler: (values: Object) => void

Optional function. If you want to have a validation step before the onSubmitHandler you can provide this prop with a function which receives the most recent values of the InputFields.

One important thing to notice is that this function should throw Error if the validation you are checking fails. The Error thrown will be caught by the function responsible to deal with errors in the Form component and then it will create an Alert on top of all the fields in the Form showing the error message. If there is no Error thrown then the validation was successful and the values will be passed to 'onSubmitHandler'

- submitButtonText: string
Optional. Represents the text of the submit button if you want it to have a different text than the default 'Submit'.
