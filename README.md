# Forminho

A library to help you create simple forms without having to build the state and error handling logic from scratch.

## Installation

Since this library is currently a study project, the installation is manual.

As suggested by @caiookb,you would:
1. Clone the repository and go to the most recent branch;
2. Run npm install to install all "forminho" dependencies;
3. Run npm build ;
4. Run npm pack (It creates a .tgz so you can import on your package.json and install normally);
5. Copy the .tgz to a temp folder on your project root folder;
6. Add "forminho": "file:/./tmp/forminho-0.0.1.tgz", for example, in your package.json;
7. Run npm install on your project folder;

## Usage

Currently, the forminho lib has only 3 exposed components which you can use to build simple forms: Form, Field and Button.

With them, you can create simple forms customizing both the Field and Button styles and providing less code to handle its logic.

See the example with the explanation below to get a grip on how to create forms.

```javascript
import { Form, Field, Button } from 'forminho';

const App = () => {
    const onSubmitHandler = (values) => {
        console.log(values);
    };

        return (
        <div style={{width: '20rem', margin: '0 auto'}}>
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
      </div>
    )
}
```

To create a Form, in its simplest way, you need to provide Fields as well as initialValues and the onSubmitHandler props to the Form component.

The 'name' prop in each Field need to be matched on the 'initialValues' prop since the values provided to 'initialValues' will be the initial values to the Fields on the Form context handler.

The 'onSubmitHandler' is another required prop on Form since this tells the component what to do when the user clicks on the standard submit button.

As you can see, there was no Button passed as a child to the Form component. The Form creates a default Button with 'Submit' text and which calls the 'onSubmitHandler'. If you want to customize it you can pass your own Button.

This is the basic example for you to start using 'forminho', for more examples head to the Examples section.

## Components
In this section we are going to show the components and its props.


```
<Form />
```
Provides the context to handle the values of all the Fields, the error and field refs. `Form` actually does not have any state to it and handle the values of each Field with `refs` to take advantage of uncontrolled components and have less re-renders.

##### Props
- initialValues: Object

**Required**. Represents the initial values that every child Field will have. Each field in the 'initialValues' must match one of the 'name' prop in the Field of the Form.

- onSubmitHandler: (values: Object) => void

**Required function**. This props receives the function you would want to execute after the user clicks the submit button. The function receives the most recent values of the Fields. It is called after the onValidationHandler function if this prop was provided, therefore it only executes if the validation provided had no error.

- onValidationHandler: (values: Object) => void

**Optional function**. If you want to have a validation step before the onSubmitHandler you can provide this prop with a function which receives the most recent values of the Fields.

One important thing to notice is that this function should throw Error if the validation you are checking fails. The Error thrown will be caught by the function responsible to deal with errors in the Form component and then it will create an Alert on top of all the fields in the Form showing the error message. If there is no Error thrown then the validation was successful and the values will be passed to 'onSubmitHandler'.

- onLiveErrorFeedback: (values: Object) => void

**Optional function**. For when you want to have a live error feedback while the user is typing. Providing this prop, you can use the `setFieldError` and `clearFieldError` from the `handleFieldError` object to show error messages below the Field when the values that the user typed does not fullfil some logic you determine. This function receives the most recent values of the Fields for you to handle this live error feedbacks.

- onChangeHandler: (event: React.ChangeEvent<HTMLFormElement>, values: Object) => void

**Optional function**. For when you want to change the state or have side effects on the parent component of the `<Form />`. It receives the `ChangeEvent` for the `HTMLFormElement`, which you have information about the form target changed, and the most recent values from the Fields.

- submitButtonText: string

**Optional**. Represents the text of the submit button if you want it to have a different text than the default 'Submit'. Passing this prop you don't need to have a Button as a child of the Form, if you only want to modify its text. If you want to customize its style as well then you should have a Button as one of the Form's children.

- style: Object

**Optional**. It is the custom style you want to provide the Field with. It receives a javascript object as you would pass it to style a HTML tag on a JSX file.

- css: Template string

**Optional**. It is a template string you pass to the component if you want to change its style in the CSS in JS way. You pass the template string just like you would be styling a component with `styled-components` or `emotion` library.

```
  const formStyle = `
    padding: 1em;
    border-radius: 5px;
    background-color: hsl(0, 0%, 95%);
  `
  
  <Form
        initialValues={{ email: '', password: '' }}
        onSubmitHandler={onSubmitHandler}
        css={formStyle}
    >
```

- className: string

**Optional**. You can also style the Field passing the className that matches a class in your css file.

```
    import './style.css'

    <Form
        initialValues={{ email: '', password: '' }}
        onSubmitHandler={onSubmitHandler}
        className='form'
    >
```


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

**Required**. Represents the name of the Field and should have a matching field on the Form's 'initialValues' object.

- placeholder: string

**Optional**. Represents the placeholder of the Field.

- label: string

**Optional**. Represents the text in the HTML label on top of the input.

- style: Object

**Optional**. It is the custom style you want to provide the Field with. It receives a javascript object as you would pass it to style a HTML tag on a JSX file.

- css: Template string

**Optional**. It is a template string you pass to the component if you want to change its style in the CSS in JS way. You pass the template string just like you would be styling a component with `styled-components` or `emotion` library.

```
  const inputStyle = `
    padding: 1em;
    border-radius: 5px;
    background-color: hsl(0, 0%, 95%);
  `
  
  <Field.Input css={inputStyle} name='email' type='text' label='Email:' />
```

- className: string

**Optional**. You can also style the Field passing the className that matches a class in your css file.

```
    import './style.css'

    <Field.Input name='email' type='text' placeholder='Email Address' className='form-field animation a3 workaround-w100' />
```

- liveUpdate: Function

**Optional**. This props is used for the parent component to have access to the value of the Field when its been updated. For that, the parent component would have a state to deal with this input value update and pass the set state function to the `liveUpdate` prop. When the input value is changed, the `Field` onChange method calls the function passed to the `liveUpdate` so that it updates the value in the parent component state.

This prop is only used when you need to have the value of one Field outside the Form.

```
    const App = () => {
        const [liveFirstName, setLiveFirstName] = useState('');
        return (
        <div>
            <p> You typed: {liveFirstName} </p>
            <Form
                initialValues={{ firstName: 'Jonh' }}
                onSubmitHandler={onSubmitHandler}
            >
              <Field.Input liveUpdate={setLiveFirstName} name='firstName' type='text' />
            </Form>
        </div>)
   }

```

- options: string[]

**Optional**. This prop is only used in the `Field.Select` if you want to simplify the way you create the options for the select. This way, the value and the text of each option will be the strings in the array.

```
    <Field.Select name='team' label='Your team' options={['Chelsea', 'Arsenal']} />
```


```
<Button />
```

- text: string

**Optional**. The custom text you would want the button to show instead of the default 'Submit'.

- style: Object

**Optional**. It is the custom style you want to provide the Button with. It receives a javascript object as you would pass it to style a HTML tag on a JSX file.

- css: Template string

**Optional**. It is a template string you pass to the component if you want to change its style in the CSS in JS way. You pass the template string just like you would be styling a component with `styled-components` or `emotion` library.

- className: string

**Optional**. You can also style the Field passing the className that matches a class in your css file.


## Examples

Below we provide a few examples using the components and their props to create custom forms.

#### Form with fields validation before submit

```javascript
import { Form, Field, } from 'forminho';

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
    );
};
```

### Form with live error feedbacks while user is typing

```javascript
import { Form, Field, handleFieldError } from 'forminho';

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
    )
}

```

### Using liveUpdate prop on Field to get the content of a Field when it is updated

```javascript

const Form = () => {
    const [liveFirstName, setLiveFirstName] = useState('');
    const onSubmitHandler = (values) => {
        console.log(values);
    };

    return (
        <div style={{width: '20rem', margin: '0 auto'}}>
            <Forminho>
                <p>You typed: {liveFirstName}</p>
                <Form
                    initialValues={{ firstName: '' }}
                    onSubmitHandler={onSubmitHandler}
                >
                <Field.Input liveUpdate={setLiveFirstName} name='firstName' type='text' />
            </Form>
        </Forminho>
      </div>
    )
}

```
