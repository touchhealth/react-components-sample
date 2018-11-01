import React from 'react';
import PropTypes from 'prop-types';
import MarkdownViewer from './MarkdownViewer';

function UseCase(props) {
  console.log(props.description);
  return (
    <div>
      <h3>{props.title}</h3>
      {props.description && <MarkdownViewer content={props.description} style={{padding: "10px 0px 10px 0px"}} />}
      <div style={{padding: "10px 0px 10px 0px"}}>
        {props.children}
      </div>
    </div>
  );
}

UseCase.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

UseCase.defaultProps = {
  title: "Use Case",
  description: ""
};

export default UseCase;