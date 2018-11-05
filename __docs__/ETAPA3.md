# Apresentação

[Voltar](ETAPA2.md)

## 3. Documentação

Documente bem sua componente, lembre-se sempre que outras pessoas irão usá-las e o melhor que você tem a fazer, é ter tudo bem explicado. Dessa forma você será menos acionado em suportes e os usuários serão mais produtivos.

A forma mais fácil de testar sua componente é criando estórias no storybook, com elas você testa o funcionamento individual além de documentar em um estilo showcase. Uma boa forma de juntar as duas coisas é criando algumas componentes para serem usadas no processo de documentação:

Para extração dos dados de documentação instale algumas dependências:
    
    yarn add -D mkdirp glob react-docgen rimraf

crie um script: `scripts/docgen.js`, que será responsável por usar o react-docgen para extrair informações das componentes:

~~~javascript
// Importando bibliotecas node
const path = require('path');
const fs = require('fs');
const glob = require("glob");
const mkdirp = require('mkdirp');
const reactDocs = require('react-docgen');

// Diretório de Source
const srcDir = "./src/";

// Diretório base de Destino
const docsDir = "./stories/_docs/";

// Lista os arquivos .js em qualquer subdiretório da pasta source
glob(srcDir + "**/*.js", {}, function (er, files) {
    
    // Itera pelos arquivos encontrados
    files.map(file => { console.log('Building docs for ' + file);

        // Nome do arquivo sem a extensão
        var fileName = path.basename(file, '.js');

        // Caminho entre o srcDir e o arquivo de fato
        var relativeDir = path.dirname(file).substring(srcDir.length);
        if (relativeDir) {
            relativeDir = relativeDir + '/';
        }
        
        // Cria o diretório de destino caso seja necessário
        mkdirp(docsDir + relativeDir, (err) => {});

        // Lê o conteudo do arquivo usando o encoding UTF-8 em texto
        fs.readFile(file, 'utf8', (err, data) => {
            try {
                // Aplica o react-docgen para tentar extrair as informações da componente
                var componentInfo = reactDocs.parse(data);

                // Caso consiga extrair, salva um arquivo .json com as informações para consumo futuro
                fs.writeFileSync(docsDir + relativeDir + fileName + '.json', JSON.stringify(componentInfo), 'utf8');
            } catch (ex) {
                // Em algumas situações não será possível extrair, e o erro será ignorado.
            }
        })
    })
})
~~~

Atualize a seção `scripts` do `package.json`

    "build:docs": "node ./scripts/docgen.js",
    "storybook": "yarn run build:docs && start-storybook -p 6006",
    "build-storybook": "yarn run build:docs && build-storybook"

Para a construção das componentes de documentação instale as dependências:

    yarn add -D highlight.js marked
    yarn add bootstrap@3.3.7

### Componentes de Documentação:

`MarkdownViewer.js` será responsável por desenhar na tela um conteudo markdown, que dá uma boa liberadade para a formatação do texto:

~~~javascript
import "./Markdown_github.css";
import "highlight.js/styles/github.css";

import React from 'react';
import highlight from 'highlight.js';
import marked from 'marked';

marked.setOptions({
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

const renderer = new marked.Renderer();

function MarkdownViewer(props) {
    const { 
        content,
        ...otherProps
    } = props;
    const compiled = marked(content, {renderer: renderer});
    return (
        <div className="markdown-body" dangerouslySetInnerHTML={{__html : compiled}} {...otherProps}></div>
    )
}

export default MarkdownViewer;
~~~

`DocsContainer.js` será o container de toda a documentação que será extraída pelo react-docgen, e dos casos de uso apresentados:

~~~javascript
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import MarkdownViewer from './MarkdownViewer';
import PropsContainer from './PropsContainer';
import MethodsContainer from './MethodsContainer';

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
~~~

`PropsContainer.js` usada pela DocsContainer ela é responsável por mostrar as propriedades da componente:

~~~javascript
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
~~~

`MethodsContainer.js` usada pela DocsContainer ela é responsável por mostrar todos os métodos documentados da componente:

~~~javascript
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
~~~

`UseCase.js` usada para mostrar um caso de uso da componente:

~~~javascript
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
~~~

Criando uma Estória completa, temos Teste visual e Documentação ao mesmo tempo, como temos nesse exemplo a seguir:

~~~javascript
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DocsContainer from './doc/DocsContainer';
import UseCase from './doc/UseCase';

import Button from '../src/Button';
import docs from './_docs/Button.json';

storiesOf('Componentes', module)
.add('Button', () => (
    <DocsContainer docs={docs}>
        <UseCase title="Básico" description={`
    <Button onClick={(event) => {}}>
        Hello Button
    </Button>
    `}>
            <Button onClick={action('clicked')}>Hello Button</Button>
        </UseCase>
        <UseCase title="Com emojis" description={`
    <Button onClick={(event) => {}}>
        <span role="img" aria-label="so cool">
        😀 😎 👍 💯
        </span>
    </Button>
    `}>
            <Button onClick={action('clicked')}>
            <span role="img" aria-label="so cool">
                😀 😎 👍 💯
            </span>
            </Button>
        </UseCase>
    </DocsContainer>
)
);
~~~


[Próximo](ETAPA4.md)