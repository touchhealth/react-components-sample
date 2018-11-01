import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from './doc/DocsContainer';
import UseCase from './doc/UseCase';

import Clock from '../src/Clock';
import docs from './_docs/Clock.json';

storiesOf('Componentes', module)
  .add('Clock', () => (
      <DocsContainer docs={docs}>
        <UseCase title="Básico" description={`    <Clock />`}>
          <Clock />
        </UseCase>
      </DocsContainer>
    )
  );