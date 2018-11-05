import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DocsContainer from './doc/DocsContainer';
import UseCase from './doc/UseCase';

import Button from '../src/Button';
import docs from './_docs/Button.json';

import ButtonRB from '../src/ButtonRB';
import docsRB from './_docs/ButtonRB.json';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

storiesOf('Componentes', module)
.add('Button', () => (
  <React.Fragment>
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
    <DocsContainer docs={docsRB}>
      <UseCase title="Básico" description={`
    <ButtonRB onClick={(event) => {}}>
      Hello Button
    </ButtonRB>
    `}>
        <ButtonRB onClick={action('clicked')}>Hello Button</ButtonRB>
      </UseCase>
      <UseCase title="Com emojis" description={`
    <ButtonRB onClick={(event) => {}}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </ButtonRB>
    `}>
        <ButtonRB onClick={action('clicked')}>
          <span role="img" aria-label="so cool">
            😀 😎 👍 💯
          </span>
        </ButtonRB>
      </UseCase>
      <UseCase title="Toolbar com estilos" description={`
    import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

    <ButtonToolbar>
      <ButtonRB bsStyle="success" onClick={action('clicked')}>success</ButtonRB>
      <ButtonRB bsStyle="warning" onClick={action('clicked')}>warning</ButtonRB>
      <ButtonRB bsStyle="danger" onClick={action('clicked')}>danger</ButtonRB>
      <ButtonRB bsStyle="info" onClick={action('clicked')}>info</ButtonRB>
      <ButtonRB bsStyle="default" onClick={action('clicked')}>default</ButtonRB>
      <ButtonRB bsStyle="primary" onClick={action('clicked')}>primary</ButtonRB>
      <ButtonRB bsStyle="link" onClick={action('clicked')}>link</ButtonRB>
    </ButtonToolbar>
`}>
        <ButtonToolbar>
          <ButtonRB bsStyle="success" onClick={action('clicked')}>success</ButtonRB>
          <ButtonRB bsStyle="warning" onClick={action('clicked')}>warning</ButtonRB>
          <ButtonRB bsStyle="danger" onClick={action('clicked')}>danger</ButtonRB>
          <ButtonRB bsStyle="info" onClick={action('clicked')}>info</ButtonRB>
          <ButtonRB bsStyle="default" onClick={action('clicked')}>default</ButtonRB>
          <ButtonRB bsStyle="primary" onClick={action('clicked')}>primary</ButtonRB>
          <ButtonRB bsStyle="link" onClick={action('clicked')}>link</ButtonRB>
        </ButtonToolbar>
      </UseCase>
    </DocsContainer>
  </React.Fragment>
  )
);