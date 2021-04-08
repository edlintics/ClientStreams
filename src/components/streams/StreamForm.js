import React from 'react';
import { Field,reduxForm } from 'redux-form'

class streamForm extends React.Component {
    
    // meta.touch is the state whether the user is typing on that field

    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
    //input is taken from formProps
    // label is destructure from the prop in Field underneath
    // meta.error destructure from meta object that contain error
    renderInput = ({input, label, meta}) => { // user formProps as a control parameter 
        // if bothe meta.error is true and meta.touched is true (focus in div)
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
        <div className = {className}>
            <label>{label}</label>
            <input {...input} autoComplete="off"/>
            {this.renderError(meta)}
        </div>
        ) // query the input from the passing props
        // since the value of this is an unknown, a content that is unknown to our component
    }
    
    // every time the form get submited, we create the streama action
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues)
    }

    render() {
        return (
        <form 
        onSubmit={this.props.handleSubmit(this.onSubmit)} 
        className="ui form error"
        >
            <Field 
                name="title" 
                component={this.renderInput} 
                label="Enter Title"
            />
            <Field 
                name="description" 
                component={this.renderInput} 
                label="Enter Input"
            />
            <button className="ui button primary">Submit </button>
        </form>)
    }
}

//form validation for data
const validate = (formValues) => {
    const errors = {}
    if(!formValues.title) {
        // if there is no form value
        errors.title = 'You must enter a title' // refer to the name field above
    }

    if(!formValues.description) {
        errors.description = "You must enter a description"
    }
    // return an error object if there is an error
    return errors;
}

//wire up multiple connect to site
export default reduxForm({
    //receive a single object
    form: 'streamForm',
    validate // passing in the validate
}) (streamForm)

