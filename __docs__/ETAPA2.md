# Apresentação

[Voltar](ETAPA1.md)

## 2. Conceitos básicos de Componentes

### Layout ou Stateless

São componentes mais simples pois não tem estado interno. O método render usa apenas a propriedades passadas para se desenhar.

`Paper.js`
~~~javascript
import React from 'react';

function Paper(props) {
    const { children, ...otherProps } = props;

    var style = {
        boxShadow: "box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px; padding: 10px",
        padding: 10
    }

    return (
        <div style={style} {...otherProps}>
            {children}
        </div>
    );
}

export default Paper;
~~~

Nessa construção temos uma componente implementada como uma função simples, que recebe as propriedades como parâmetro. Essa função realiza a operação de `render()` e neste caso não possui estado. Ela é chamada para redesenhar sempre que uma ou mais propriedades mudarem (de fora pra dentro), já que as propriedades são consideradas imutáveis.

Alguns padrões interessantes já podem ser observados aqui, o principal é extrair o máximo possível de lógica da área de desenho (em geral um `return (...)`). Compute ou mastigue o máximo possível antes dele, pois será mais fácil e visualizar o que será desenhado.

Outro padrão bastante comum é o uso de estilos definidos em javascript.

Por fim um outro padrão que veremos bastante é o uso de Destrutcturing com Spread Operators:

~~~javascript
const { children, ...otherProps } = props;

<div style={style} {...otherProps}>
~~~

Nesse caso o que estamos fazendo é pegar todas as propriedades que não são as declaradas anteriormente (children no caso), e repassando todas elas como propriedades da div interna. Em geral esse procedimento simplifica a customização.

Um ponto interessante é deixar mais claro o que sua componente faz e o que ela recebe como parâmetros para fazer, por isso é muito importante documentar bem sua componente.

Uma forma de fazer isso, além de outros benefícios, é usar as definições de tipos de propridades, que nesse caso ficaria da seguinte forma:

~~~javascript
Paper.propTypes = {
    /**
     * o conteudo
     */
    children: PropTypes.node,
    /**
     * Aceita valores entre 0 and 24 inclusive.
     */
    elevation: PropTypes.number
};

Paper.defaultProps = {
    elevation: 2
};
~~~

Com essa construção, sabemos quais são as properiedades da componente, e apesar dela não restringir apenas as declaradas, já ajuda bastante. Ela nos dá uma documentação do que significa e como se usa a propriedade, e se ela tem ou não um valor padrão.

### Com estado ou controle de cliclo de vida

São componentes mais complexos, que exigem um maior controle sobre quando eles são colocados ou tirados da tela, e quando devem ser redesenhados. Para esses casos é recomendado o uso da construção mais complexa, usando classes do ES6 e estendendo a classe React.Component.

Um exemplo simples mais completo é a da componente `Clock.js`:

~~~javascript
import React, { Component } from 'react';
import Paper from './Paper';

export default class Clock extends Component {

    timerHandle = null;

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    tick = () => {
        this.setState({ date: new Date() });
    } 

    componentDidMount() {
        this.timerHandle = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        if (this.timerHandle != null) {
            clearInterval(this.timerHandle);
        }
    }

    render() {
        const { ...otherProps } = this.props;
        const { date } = this.state;
        return (
            <Paper {...otherProps}>{date.toLocaleTimeString()}</Paper>
        );
    }
}
~~~

Nela observamos três coisas diferentes em relação ao anterior:

A primeira é o fato de definirmos uma classe e não apenas uma função. Essa classe possui uma função `render()`, cujo papel é o mesmo da anterior, devolver o que deve ser desenhado.

A segunda diferença é o fato de manipularmos uma propriedade da componente chamada `state`, essa deve ser considerada apenas para leitura, e suas atualizações devem ser feitas através do método `setState()`, dessa forma toda vez que o estado mudar, a componente será redesenhada. Uma característica importante do `setState()` é que ele não altera o estado como um todo, mas sim recebe um fragmento contendo apenas as mudanças, que serão aplicadas em um processo de "merge" com o estado atual.

A terceira é que essa componente se utiliza de registro de scheduler, através do método `setInterval()` e que precisa ser limpo caso a componente deixe de fazer parte da tela. Para isso usamos os metodos de lifecycle `componentDidMount()` para ativar o scheduler, e `componentWillUnmount()` para desativá-lo, de forma que não tenhamos vazamento de memória. De forma análoga, usamos esses métodos também para registrar e desregistrar listeners de eventos por exemplo. Existem outros métodos de lifecycle, mas de forma geral esses são os mais usados.

### Estado Compartilhado com Contexto

Esse é um cenário mais complexo ainda, pois o estado interno da componente não é importante apenas para ele próprio, mas também para outros processos da interface. É fácil associar essa necessidade a um preenchimento de formulário por exemplo. Cada componente de entrada, usada dentro de um formulário irá compor uma parte do estado do formulário, e normalmente esse deve ser enviado para um servidor ao final do processo de preenchimento.

Existem várias formas de lidar com essa questão, e a complexidade e necessidade de usar algo além do básico se dá dependendo do tamanho do problema que estamos enfrentando. As mais conhecidas são: redux e mobx. Redux é baseada no conceito flux, que trabalha com cadeias de operações bem definidas e objetos de estado imutáveis, que são trocados quando algo precisa ser alterado. Este em geral é mais simples de entender e debugar, mas mais complexo de se utilizar. A outra opção, é o mobx, é baseada no conceito de que o estado é mutável e suas mudanças devem ser observadas para que produzam efeitos como redesenhar as componentes. Ela é mais mágica, mais parecida com que conheciamos no angular 1, porém nos oferece um controle maior, e por isso uma performance melhor. Seu maior benefício é que após uma pequena curva de aprendizado, é mais simples de usar que o Redux, exigindo menos código para funcionar.

Aqui vou mostrar um exemplo simples, em que o estado é gerenciado sem nenhuma biblioteca extra, porém de uma forma em que os métodos de tratamento de eventos não precisem ser propagados por toda arvore de componentes de forma explícita. Para isso vou utilizar a técnica do Contexto, que pode ser usada para diversas outras finalidades, como temas que veremos mais pra frente.

Para isso serão necessárias algumas componentes que irão trabalhar juntas. Primeiro a definição do `Form.js` que representará o estado geral:

~~~javascript
import React, { Component } from 'react';

export const FormContext = React.createContext({});

export default class Form extends Component {

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    getFormState = () => {
        return {...this.state};
    }

    render() {
        const { children, ...otherProps } = this.props;

        let formValue = {
            handleInputChange: this.handleInputChange,
            getFormState: this.getFormState
        } 

        return (
            <FormContext.Provider value={formValue}>
                <div {...otherProps}>
                    {children}
                </div>
            </FormContext.Provider>
        );
    }
}
~~~

Criamos o FormContext, que será o responsável por armazenar e propagar o contexto de forma transparente para toda a árvore abaixo dele, usando a compoenente `<FormContext.Provider value={contexto}>`. O estado será mantido no `state` da componente `Form`, e as alterações feitas nele são controladas pelo método `handleInputChange(changeEvent)` que é propagado pelo contexto para as componentes filhas que precisarem realizar alterações no estado.

Para complementar esse solução, criamos pelo menos mais duas componentes, uma de entrada `FormInput` e outra de ação `FormButton` que funcionam atreladas ao form através do uso do contexto, como podemos ver a seguir:

`FormInput.js`
~~~javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import { FormContext } from './Form';

export default class FormInput extends Component {

    static contextType = FormContext;

    static propTypes = {
        /**
         * Tipo de input
         */
        type: PropTypes.string,
        /**
         * Nome do campo
         */
        name: PropTypes.string,
    }

    render() {
        const {
            name,
            ...otherProps
        } = this.props;

        const {
            handleInputChange,
            getFormState
        } = this.context

        const value = getFormState()[name] || "";

        return (
            <Input name={name} {...otherProps} onChange={handleInputChange} value={value} />
        );
    }

}
~~~

`FormButton.js`
~~~javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from './Form';
import Button from './Button';

export default class FormButton extends Component {

    static contextType = FormContext;

    static propTypes = {
        onClick: PropTypes.func.isRequired,
    }

    handleClick = () => {
        this.props.onClick(this.context.getFormState());
    }

    render() {
        const {
            children,
            ...otherProps
        } = this.props;

        return (
            <Button onClick={this.handleClick} {...otherProps}>{children}</Button>
        );
    }
}
~~~

Ambas definem o interesse pelo contexto do tipo `FormContext` através da propriedade estática `contextType = FormContext`, e usam a propriedade `context` para recuperar as funções disponibilizadas nele. As propriedades do estado são salvas segundo as propriedades `name` dos inputs, como é tradicionamente feito em formularios HTML comuns.

### Dicas gerais

1. Sempre definir as configurações de tipagem de propriedades da forma mais completa possível

        static propTypes
        static defaultProps

1. No método render, a parte JSX deve ser o mais simples possível, sem muita lógica, para melhorar o entendimento. Prepare as propriedades, estilos, lógicas complexas antes  ou em subfunções.

1. Evite usar funções anônimas como event listeners como onChange, pois novas funções serão sempre (re)construídas a cada rendering. Em geral só faz sentido usar dessa forma quando queremos usar um parâmetro da closure, vide `Tab.js`

1. Salve os estilos em um ponto centralizado da componente, e apenas combine as propriedades que forem dinâmicas. O uso de estilos no javascript é mais limitado do que no CSS, principalmente em relação a regras especiais como :hover, :focus e etc. Para isso veremos a seguir uma opção que mistura o melhor dos dois mundos.

[Próximo](ETAPA3.md)