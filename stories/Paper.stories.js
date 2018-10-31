import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Paper from '../src/Paper';

storiesOf('Paper', module)
  .add('Com texto', () => <Paper>Simples Conteudo Texto</Paper>)
  .add('Com elevações', () => {
    let elements = [];
    for (let i = 0; i <= 24; i++) {
      elements.push(
        <div style={{padding: 20}}>
          <Paper elevation={i}>
            <h3>{i}</h3>
            Simples Conteudo Texto<br/>
            Simples Conteudo Texto<br/>
            Simples Conteudo Texto<br/>
            Simples Conteudo Texto
          </Paper>
        </div>
      );
    }
    return elements;
  });
