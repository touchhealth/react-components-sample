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