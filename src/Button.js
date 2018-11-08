import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Botão Simples
 * ~~~javascript
 * var a = b + c;
 * ~~~
 */
export default class Button extends Component {

  static propTypes = {
    /**
     * Desabilitado?
     */
    disabled: PropTypes.bool,
    /**
     * Tratador de evento de clique
     */
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    disabled: false
  };

  constructor(props) {
    super(props);
  }
  
  render() {
    let {
      children,
      disabled,
      onClick,
      ...otherProps
    } = this.props;

    return (
      <button disabled={disabled} onClick={onClick} {...otherProps} >
        {children}
      </button>
    );
  }
}
