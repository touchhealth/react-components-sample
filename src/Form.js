import React, { Component } from 'react';
import PropTypes from 'prop-types';


export const FormContext = React.createContext({});

export default class Form extends Component {

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    getFormState = () => {
        return {...this.state};
    }

    render() {
        const { children } = this.props;

        let formValue = {
            handleInputChange: this.handleInputChange,
            getFormState: this.getFormState
        } 

        return (
            <FormContext.Provider value={formValue}>
                <div>
                    {children}
                </div>
            </FormContext.Provider>
        );
    }
}