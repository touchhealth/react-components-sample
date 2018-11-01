import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import MarkdownViewer from './MarkdownViewer';
import PropsContainer from './PropsContainer';
import MethodsContainer from './MethodsContainer';

/**
 * Container de documentação.
 * 
 * Propriedades: 
 * - docs: um json com os dados extraidos pelo react-docgen
 * - children: o conteudo da documentação (UseCases)
 */
function DocsContainer(props) {
  var meta = props.docs;
  if (meta) {
    return (
      <div style={{padding:"10px"}}>
        <h1>{meta.displayName}</h1>
        <hr/>
        <MarkdownViewer content={meta.description} />
        {meta.props && <PropsContainer props={meta.props} />}
        {meta.methods && <MethodsContainer methods={meta.methods} />}
        <hr />
        {props.children && (
          <React.Fragment>
            <h2>Exemplos e Usos</h2>
            {props.children}
          </React.Fragment>
        )}
      </div>
    );
  }
  return (
    <div style={{padding:"10px"}}>
      <h2>Exemplos e Usos</h2>
      {props.children}
    </div>
  );
}

export default DocsContainer;