import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from './doc/DocsContainer';
import UseCase from './doc/UseCase';

import Tab from '../src/Tab';
import docs from './_docs/Tab.json';


let titles = ['Aba1', 'Aba2', 'Aba3'];
let content = [<div>Conteudo da Aba1</div>, <div>Conteudo da Aba2</div>, <div>Conteudo da Aba3</div>];

storiesOf('Componentes', module)
.add('Tab', () => 
  <DocsContainer docs={docs}>
    <UseCase title="Básico" description={`    
    let titles = ['Aba1', 'Aba2', 'Aba3'];
    let content = [<div>Conteudo da Aba1</div>, <div>Conteudo da Aba2</div>, <div>Conteudo da Aba3</div>];

    <Tab titles={titles} content={content} />`}>
      <Tab titles={titles} content={content} />
    </UseCase>
  </DocsContainer>
);