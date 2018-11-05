import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RBButton from 'react-bootstrap/lib/Button';
// import { Button as RBButton } from 'react-bootstrap'; ??

/**
 * Botão Bootstrap
 */
export default class ButtonRB extends Component {

  static propTypes = {
    /**
     * Desabilitado?
     */
    disabled: PropTypes.bool,
    /**
     * Tratador de evento de clique
     */
    onClick: PropTypes.func.isRequired,
    /**
     * Variações visuais do botão bootstrap
     */
    bsStyle: PropTypes.oneOf(["success", "warning", "danger", "info", "default", "primary", "link"]),
    /**
     * O Tamanho do botão
     */    
    bsSize: PropTypes.oneOf(["lg", "large", "sm", "small", "xs", "xsmall"])    
  };

  static defaultProps = {
    disabled: false,
    bsStyle: 'default'
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
      <RBButton disabled={disabled} onClick={onClick} {...otherProps} >
        {children}
      </RBButton>
    );
  }
}
