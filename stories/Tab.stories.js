import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from './doc/DocsContainer';
import UseCase from './doc/UseCase';

import Tab from '../src/Tab';
import docs from './_docs/Tab.json';

import TabStyled from '../src/TabStyled';
import docsTabStyled from './_docs/TabStyled.json';

import Theme from '../src/Theme';
import TabThemed from '../src/TabThemed';
import docsTabThemed from './_docs/TabThemed.json';
import color from 'color';

let titles = ['Aba1', 'Aba2', 'Aba3'];
let content = [<div>Conteudo da Aba1</div>, <div>Conteudo da Aba2</div>, <div>Conteudo da Aba3</div>];

storiesOf('Componentes', module)
.add('Tab', () => 
  <React.Fragment>
    <DocsContainer docs={docs}>
      <UseCase title="Básico" description={`    
    let titles = ['Aba1', 'Aba2', 'Aba3'];
    let content = [<div>Conteudo da Aba1</div>, <div>Conteudo da Aba2</div>, <div>Conteudo da Aba3</div>];

    <Tab titles={titles} content={content} />`}>
        <Tab titles={titles} content={content} />
      </UseCase>
    </DocsContainer>
    <DocsContainer docs={docsTabStyled}>
      <UseCase title="Básico" description={`    
    let titles = ['Aba1', 'Aba2', 'Aba3'];
    let content = [<div>Conteudo da Aba1</div>, <div>Conteudo da Aba2</div>, <div>Conteudo da Aba3</div>];

    <TabStyled titles={titles} content={content} />`}>
        <TabStyled titles={titles} content={content} />
      </UseCase>
    </DocsContainer>
    <DocsContainer docs={docsTabThemed}>
      <UseCase title="Básico" description={`    
    let titles = ['Aba1', 'Aba2', 'Aba3'];
    let content = [<div>Conteudo da Aba1</div>, <div>Conteudo da Aba2</div>, <div>Conteudo da Aba3</div>];

    <Theme>
      <TabThemed titles={titles} content={content} />
    </Theme>`}>
        <Theme>
          <TabThemed titles={titles} content={content} />
        </Theme>
      </UseCase>
      <UseCase title="Tema Verde" description={`    
    let titles = ['Aba1', 'Aba2', 'Aba3'];
    let content = [<div>Conteudo da Aba1</div>, <div>Conteudo da Aba2</div>, <div>Conteudo da Aba3</div>];

    <Theme theme={{primaryColor: 'green'}}>
      <TabThemed titles={titles} content={content} />
    </Theme>`}>
        <Theme theme={{primaryColor: 'green'}}>
          <TabThemed titles={titles} content={content} />
        </Theme>
      </UseCase>
      <UseCase title="Tema Amarelo Claro" description={`    
    let titles = ['Aba1', 'Aba2', 'Aba3'];
    let content = [<div>Conteudo da Aba1</div>, <div>Conteudo da Aba2</div>, <div>Conteudo da Aba3</div>];

    <Theme theme={{primaryColor: 'light-yellow'}}>
      <TabThemed titles={titles} content={content} />
    </Theme>`}>
        <Theme theme={{primaryColor: '#ffffb3'}}>
          <TabThemed titles={titles} content={content} />
        </Theme>
      </UseCase>
    </DocsContainer>
  </React.Fragment>
);