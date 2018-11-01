import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from './doc/DocsContainer';
import UseCase from './doc/UseCase';

import Form from '../src/Form';
import docsForm from './_docs/Form.json';

import FormButton from '../src/FormButton';
import docsFormButton from './_docs/FormButton.json';

import FormInput from '../src/FormInput';
import docsFormInput from './_docs/FormInput.json';

import Tab from '../src/Tab';

const styles = {
  label: {
    display: "inline-block",
    width: 100
  },
  field: {
    padding: '5px 0px'
  }
}

const dadosPessoais = () => (
  <div>
    <div style={styles.field}>
      <div style={styles.label}>Nome:</div><FormInput name="nome" />
    </div>
    <div style={styles.field}>
      <div style={styles.label}>Idade:</div><FormInput name="idade" />
    </div>
  </div>
);

const dadosEnderecos = () => (
  <div>
    <div style={styles.field}>
      <div style={styles.label}>Endereco:</div><FormInput name="endereco" />
    </div>
    <div style={styles.field}>
      <div style={styles.label}>Cidade:</div><FormInput name="cidade" />
    </div>
  </div>
);

storiesOf('Componentes', module)
.add('Form', () => (
  <React.Fragment>
    <DocsContainer docs={docsForm}>
    </DocsContainer>
    <DocsContainer docs={docsFormButton}>
    </DocsContainer>
    <DocsContainer docs={docsFormInput}>
    </DocsContainer>
    <DocsContainer>
      <UseCase title="Básico" description={`
    const styles = {
      label: {
        display: "inline-block",
        width: 100
      },
      field: {
        padding: '5px 0px'
      }
    }

    <Form>
      <div style={styles.field}>
        <div style={styles.label}>Nome:</div><FormInput name="nome" />
      </div>
      <div style={styles.field}>
        <div style={styles.label}>Senha:</div><FormInput name="senha" type="password" />
      </div>
      <div style={styles.field}>
        <div style={styles.label}>Idade:</div><FormInput name="idade" />
      </div>
      <FormButton onClick={(form) => alert(JSON.stringify(form))}>Submit</FormButton>
    </Form>`}>
        <Form>
          <div style={styles.field}>
            <div style={styles.label}>Nome:</div><FormInput name="nome" />
          </div>
          <div style={styles.field}>
            <div style={styles.label}>Senha:</div><FormInput name="senha" type="password" />
          </div>
          <div style={styles.field}>
            <div style={styles.label}>Idade:</div><FormInput name="idade" />
          </div>
          <FormButton onClick={(form) => alert(JSON.stringify(form))}>Submit</FormButton>
        </Form>
      </UseCase>

      <UseCase title="Com níveis em Abas" description={`
    const dadosPessoais = () => (
      <div>
        <div style={styles.field}>
          <div style={styles.label}>Nome:</div><FormInput name="nome" />
        </div>
        <div style={styles.field}>
          <div style={styles.label}>Idade:</div><FormInput name="idade" />
        </div>
      </div>
    );

    const dadosEnderecos = () => (
      <div>
        <div style={styles.field}>
          <div style={styles.label}>Endereco:</div><FormInput name="endereco" />
        </div>
        <div style={styles.field}>
          <div style={styles.label}>Cidade:</div><FormInput name="cidade" />
        </div>
      </div>
    );

    <Form>
      <Tab titles={['Dados Pessoais', 'Endereços']} content={[dadosPessoais(), dadosEnderecos()]} />
      <br/>
      <FormButton onClick={(form) => alert(JSON.stringify(form))}>Submit</FormButton>
    </Form>`}>
        <Form>
          <Tab titles={['Dados Pessoais', 'Endereços']} content={[dadosPessoais(), dadosEnderecos()]} />
          <br/>
          <FormButton onClick={(form) => alert(JSON.stringify(form))}>Submit</FormButton>
        </Form>
      </UseCase>
    </DocsContainer>
  </React.Fragment>)
);
