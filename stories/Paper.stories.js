import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from './doc/DocsContainer';
import UseCase from './doc/UseCase';

import Paper from '../src/Paper';
import docs from './_docs/Paper.json';

storiesOf('Componentes', module)
.add('Paper', () => 
  <DocsContainer docs={docs}>
    <UseCase title="Básico" description={`    <Paper>Simples Conteudo Texto<br/>Simples Conteudo Texto</Paper>`}>
      <Paper>Simples Conteudo Texto</Paper>
    </UseCase>
    <UseCase title="Com Elevação 0" description={`    <Paper elevation={0}>Simples Conteudo Texto<br/>Simples Conteudo Texto</Paper>`}>
        <Paper elevation={0}>Simples Conteudo Texto<br/>Simples Conteudo Texto<br/>Simples Conteudo Texto<br/>Simples Conteudo Texto</Paper>
    </UseCase>
    <UseCase title="Com Elevação 1" description={`    <Paper elevation={1}>Simples Conteudo Texto<br/>Simples Conteudo Texto</Paper>`}>
        <Paper elevation={1}>Simples Conteudo Texto<br/>Simples Conteudo Texto<br/>Simples Conteudo Texto<br/>Simples Conteudo Texto</Paper>
    </UseCase>
    <UseCase title="Com Elevação 2" description={`    <Paper elevation={2}>Simples Conteudo Texto<br/>Simples Conteudo Texto</Paper>`}>
        <Paper elevation={2}>Simples Conteudo Texto<br/>Simples Conteudo Texto<br/>Simples Conteudo Texto<br/>Simples Conteudo Texto</Paper>
    </UseCase>
    <UseCase title="Com Elevação 4" description={`    <Paper elevation={4}>Simples Conteudo Texto<br/>Simples Conteudo Texto</Paper>`}>
        <Paper elevation={4}>Simples Conteudo Texto<br/>Simples Conteudo Texto<br/>Simples Conteudo Texto<br/>Simples Conteudo Texto</Paper>
    </UseCase>
    <UseCase title="Com Elevação 8" description={`    <Paper elevation={8}>Simples Conteudo Texto<br/>Simples Conteudo Texto</Paper>`}>
        <Paper elevation={8}>Simples Conteudo Texto<br/>Simples Conteudo Texto<br/>Simples Conteudo Texto<br/>Simples Conteudo Texto</Paper>
    </UseCase>
    <UseCase title="Com Elevação 24" description={`    <Paper elevation={24}>Simples Conteudo Texto<br/>Simples Conteudo Texto</Paper>`}>
        <Paper elevation={24}>Simples Conteudo Texto<br/>Simples Conteudo Texto<br/>Simples Conteudo Texto<br/>Simples Conteudo Texto</Paper>
    </UseCase>
  </DocsContainer>
);