import React from 'react';
import MarkdownViewer from './MarkdownViewer';

var styles = {
  paramBlock: {
    marginLeft: 20
  },
  methodBlock: {
    marginBottom: 20
  }
}

function MethodsContainer(props) {
  let methods = props.methods;
  if (!methods) return null;

  let docMethods = [];
  methods.map(method => {
    if (method.docblock != null) {
      console.log(method);
      let paramSigs = [];
      method.params != null && method.params.length > 0 && method.params.map(param => {
        console.log(param);
        paramSigs.push(param.name + (param.type ? ':' + param.type : ''));
      });
      method.signature = method.name + '(' + paramSigs.join(', ') + ')';
      docMethods.push(method);
    }
  });

  return (
    <React.Fragment>
      {docMethods.length > 0 && <h2>Métodos</h2>}
      {docMethods.map(method => (
        <div style={styles.methodBlock} key={method.signature}>
          <h3>{method.signature}</h3>
          {method.description && <MarkdownViewer content={method.description} />}
          {method.params.map(param => param.description && <div style={styles.paramBlock}>{param.name}: {param.description}</div>)}
        </div>
      ))}
    </React.Fragment>
  );
}

export default MethodsContainer;
