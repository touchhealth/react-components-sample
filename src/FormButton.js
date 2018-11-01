import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from './Form';
import Button from './Button';

export default class FormButton extends Component {

    static contextType = FormContext;

    static propTypes = {
        /**
         * Tratador de evento de clique. 
         * @param Form recebe o formulario como parametro
         */
        onClick: PropTypes.func.isRequired,
    }

    handleClick = () => {
        this.props.onClick(this.context.getFormState());
    }

    render() {
        const {
            children,
            ...otherProps
        } = this.props;

        return (
            <Button onClick={this.handleClick} {...otherProps}>{children}</Button>
        );
    }

}