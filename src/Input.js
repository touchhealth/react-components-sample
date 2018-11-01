import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {

    static propTypes = {
        /**
         * Tipo de input
         */
        type: PropTypes.string,
        /**
         * Nome do campo
         */
        name: PropTypes.string,
        /**
         * Nome do campo, se for não nulo a componente de input é gerenciada
         */
        value: PropTypes.string,
        /**
         * Change Handler
         */
        onChange: PropTypes.func.isRequired
    }

    static defaultProps = {
        type: 'text'
    }

    render() {
        const {
            type,
            name,
            value,
            onChange,
            ...otherProps
        } = this.props;

        return (
            <input type={type} name={name} value={value} onChange={onChange} {...otherProps} />
        );
    }

}