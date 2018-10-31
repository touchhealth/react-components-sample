import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import { FormContext } from './Form';

export default class FormInput extends Component {

    static contextType = FormContext;

    static propTypes = {
        /**
         * Tipo de input
         */
        type: PropTypes.string,
        /**
         * Nome do campo
         */
        name: PropTypes.string,
    }

    render() {
        const {
            name,
            ...otherProps
        } = this.props;

        const {
            handleInputChange,
            getFormState
        } = this.context

        const value = getFormState()[name] || "";

        return (
            <Input name={name} {...otherProps} onChange={handleInputChange} value={value} />
        );
    }

}