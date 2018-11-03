# Apresentação

[Voltar](ETAPA3.md)

## 4. Estilos

Estilos são uma parte muito importante de qualquer biblioteca de componentes. Procuramos sempre desenvolver algo que tenha coerência de aparência além da beleza. O comum atualmente é partirmos de algo pronto como no mínimo o [normalize.css](http://necolas.github.io/normalize.css/), ou algo mais completo como [bootstrap.css](https://getbootstrap.com/), [foundation.css](https://foundation.zurb.com/) ou [material-desing-lite.css](https://getmdl.io/started/).

Essas bases dão a aplicação um "tapa no visual" geral, mas é comum querermos e precisarmos de estilos para nossas componentes, e nesses casos um dos problemas mais comuns é o fato de não deixar os estilos de uma componente interferir em outra. Para isso algumas bibliotecas usam estilos inline `style=""`, ou `shadow-dom` que é um conceito novo e promissor, mas que ainda não é amplamente suportado.

Nesse sentido, observando as construções de uma das bibliotecas de react mais utilizadas, o `material-ui`, chegamos a uma biblioteca bem interessante, capaz de definir estilos css de forma ampla, permitindo um bom nível de customizações como temos em sass e less, e com um bom suporte ao uso de temas. Essa biblioteca é a [JSS](http://cssinjs.org) que possui uma extensão para react chamada [react-jss](http://cssinjs.org/react-jss).

### Estilizando a componente de Abas

A componente e abas, inicialmente implementada é simples e "funciona", mas muitos efeitos visuais importantes como hover ou animações são dificeis de fazer com style inline, pois teriamos que escutar eventos na mão e redesenhar as componentes o que seria bastante trabalhoso. Podendo usar os recursos de css, tudo fica mais fácil, e ainda sim conseguimos manter essas definições de estilo dentro da componente. Então vamos começar instalando as bibliotecas:

    yarn add react-jss color

~~~javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import color from 'color';

import Paper from './Paper';

const styles = {

    titleBarContainer: {
        position: 'relative',
        borderBottom: [1, 'solid', color('white').darken(0.15).hex()],
        padding: [5, 10, 0, 10],
        '& + hr': {
            marginTop: 0
        }
    },

    titleBarItem: {
        position: 'relative',
        top: 1,
        display: 'inline-block',
        padding: 10,
        borderRadius: [8, 8, 0, 0],
        borderTop: [1, 'solid', color('white').darken(0.15).hex()],
        borderLeft: [1, 'solid', color('white').darken(0.15).hex()],
        borderRight: [1, 'solid', color('white').darken(0.15).hex()],
        backgroundColor: color('white').darken(0.05).hex(),
        '&:hover': {
            backgroundColor: 'steelblue',
            color: color('steelblue').isDark ? 'white' : null
        }
    },

    titleBarItemSelected: {
        backgroundColor: 'white',
    },

    contentContainer: {
        padding: [20, 10, 10, 10]
    }

}

@injectSheet(styles)
export default class TabStyled extends Component {
    static propTypes = {
        titles: PropTypes.arrayOf(PropTypes.string),
        content: PropTypes.arrayOf(PropTypes.node),
    }

    constructor(props) {
        super(props);
        this.state = {
            tabSelectedIdx: 0
        }
    }

    selectTab(idx) {
        this.setState({ tabSelectedIdx: idx });
    }

    render() {
        const {
            titles,
            content,
            classes,
            ...otherProps
        } = this.props;

        const {
            tabSelectedIdx
        } = this.state;

        let titlesBar = (
            <div className={classes.titleBarContainer}>
                {titles.map((title, idx) => {
                    console.log(idx == tabSelectedIdx);
                    return <div className={(idx == tabSelectedIdx ? classes.titleBarItemSelected : "") + " " + classes.titleBarItem} 
                        onClick={this.selectTab.bind(this, idx)} >{title}</div>
                })}
            </div>
        )

        return (
            <Paper {...otherProps}>
                {titlesBar}
                <div key={titles[tabSelectedIdx]} className={classes.contentContainer}>
                    {content[tabSelectedIdx]}
                </div>
            </Paper>
        );
    }
}
~~~

### Usando Temas

Primeiro construimos a fundação para o tema usando o `react-jss`, que internamente irá criar um Contexto, como vimos anteriormente, para propagar o tema para toda sua árvore.

`Theme.js`
~~~javascript
import React from 'react';
import { createTheming } from 'react-jss';

export const theming = createTheming('estoque');

const { ThemeProvider } = theming

export const defaultTheme = {
  primaryColor: 'steelblue'
}

const Theme = (props) => {
    var selectedTheme = props.theme || defaultTheme
    return <ThemeProvider theme={selectedTheme}>{props.children}</ThemeProvider>
}

export default Theme;
~~~

Com isso podemos usá-lo em uma nova implementação de abas, agora com tema. Veja um resumo das mudanças aplicadas ao `TabStyled` para virar `TabThemed`.

~~~javascript
import { theming } from './Theme';

const styles = theme => ({

    titleBarContainer: {
        position: 'relative',
        borderBottom: [1, 'solid', color('white').darken(0.15).hex()],
        padding: [5, 10, 0, 10],
        '& + hr': {
            marginTop: 0
        }
    },

    titleBarItem: {
        position: 'relative',
        top: 1,
        display: 'inline-block',
        padding: 10,
        borderRadius: [8, 8, 0, 0],
        borderTop: [1, 'solid', color('white').darken(0.15).hex()],
        borderLeft: [1, 'solid', color('white').darken(0.15).hex()],
        borderRight: [1, 'solid', color('white').darken(0.15).hex()],
        backgroundColor: color('white').darken(0.05).hex(),
        '&:hover': {
            backgroundColor: theme.primaryColor,
            color: color(theme.primaryColor).isDark ? 'white' : null
        }
    },

    titleBarItemSelected: {
        backgroundColor: 'white',
    },

    contentContainer: {
        padding: [20, 10, 10, 10]
    }

})

@injectSheet(styles, { theming })
export default class TabThemed extends Component {

}
~~~

Podemos ver as diferenças básicas: O style agora é uma função que recebe o tema, e usa as propriedades definidas nele para construir o estilo. Alem disso acrescentamos a anotação de injeção o parametro `{theming}` para que o contexto do tema seja tratado. Nesse caso, essa componente passa a exigir uma definição prévia de tema, caso contrário apresentará um erro. Então para usá-la será necessario que haja ao menos uma componente de Theme como parente na arvore: `<Theme><TabThemed /></Theme>`.

Com isso concluímos as ferramentas básicas para incluir estilos flexíveis na sua biblioteca.

[Próximo](ETAPA5.md)