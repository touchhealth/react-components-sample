import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
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
