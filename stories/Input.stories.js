import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from './doc/DocsContainer';
import UseCase from './doc/UseCase';

import Input from '../src/Input';
import docs from './_docs/Input.json';

storiesOf('Componentes', module)
.add('Input', () => 
  <DocsContainer docs={docs}>
    <UseCase title="Básico" description={`    <Input />`}>
      <Input />
    </UseCase>
    <UseCase title="Password" description={`    <Input type="password" />`}>
      <Input type="password"/>
    </UseCase>
  </DocsContainer>
);
