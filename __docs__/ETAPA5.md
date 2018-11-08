# Apresentação

[Voltar](ETAPA4.md)

## 5. Componentes Terceiros

### Bibliotecas de Referência

Aqui queremos mostrar um pouco de como incorporar ou incrementar outras bibliotecas com a sua. As bibliotecas atuais mais usadas pela comunidade, e que usamos como referência nesse momento são `material-ui` e `react-bootstrap`. Da material-ui tiramos várias construções interessantes que mostramos nessa apresentação, ela possivelmente é a mais bem construída, para levarmos como referência. Por outro lado, aqui na Touch usamos muito como referência dos novos designs o `bootstrap`, e por isso o `react-bootstrap` acaba sendo a biblioteca mais lógica para usarmos. O ponto positivo dela é se basear no bootstrap, que torna fácil de incorporar outras componentes, que também se utilizavam dele.

A material-ui já vem construída com a ideia de temas desde sua concepção, então ela é mais flexivel visualmente falando, e esse é um dos pontos interessantes da MUI que não temos no RB.

    yarn add react-bootstrap material-ui

### Adaptando componentes de terceiros

Criado Botão Bootstrap: `ButtonRB`

~~~javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RBButton from 'react-bootstrap/lib/Button';

/**
 * Botão Bootstrap.
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
~~~

Nesse exemplo podemos ver algumas sugestões de como usar ou estender componentes na sua biblioteca. A melhor forma, ao contrário do que estamos mais acostumados em Java, é não usar a herança nesses casos, mas sim a composição.

É uma recomendação geral, principalmente quando existe a possibilidade de trocarmos de biblioteca base, ou quando ela não é estável o suficiente, de ao invés de usarmos diretamente nas nossas aplicações, devemos encapsulá-las em componentes nossas, para que fique mais fácil garantir os contratos com as nossas aplicações. É bem comum também querermos trocar, ou redefinir valores ou comportamentos padrão nessas componentes externas.

Outro ponto importante é que deixemos documentado, na nossa componente, as propriedades herdadas da componente base que realmente usamos.

### Imports conscientes

Como vimos no exemplo anterior, temos que importar as componentes usadas das bibliotecas base, e em geral existem duas possibilidades:

~~~javascript
import RBButton from 'react-bootstrap/lib/Button';

//ou

import { Button as RBButton } from 'react-bootstrap';
~~~

Quando possível devemos preferir importar as componentes de forma mais explícita (primeira opção). Quando usamos empacotadores como o `webpack`, ele irá fazer uma varredura de tudo que importamos para montar o pacote, e quando fazemos imports como no segundo caso, podemos acabar trazendo código que não usamos para o pacote, o que acaba deixando ele maior do que precisavamos.

[Próximo](ETAPA6.md)