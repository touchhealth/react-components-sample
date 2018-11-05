import React from 'react';
import MarkdownViewer from './MarkdownViewer';

var styles = {
  centralized: {
    textAlign: 'center'
  }
}

function PropsContainer(args) {
  let props = args.props;
  return (
    <React.Fragment>
      <h2>Propriedades</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Propriedade</th>
            <th>Tipo</th>
            <th>Obrigatório</th>
            <th>Default</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
        {Object.keys(props).map(prop => {
          var typeValues = null;
          if (props[prop].type && props[prop].type.name == 'enum' && props[prop].type.value) {
            typeValues = "`" + props[prop].type.value.map(val => val.value).join('`, `') + "`";
          }
          return <tr key={prop}>
            <td>{prop}</td>
            <td>{props[prop].type.name}</td>
            <td style={styles.centralized}>{props[prop].required ? 'sim' : ''}</td>
            <td>{props[prop].defaultValue && props[prop].defaultValue.value}</td>
            <td>
              {typeValues && <MarkdownViewer content={"Valores: " + typeValues} />}
              <MarkdownViewer content={props[prop].description} />
            </td>
          </tr>
        })}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default PropsContainer;
