import React from 'react';

import { storiesOf } from '@storybook/react';

import FormInput from '../src/FormInput';
import Form from '../src/Form';
import FormButton from '../src/FormButton';
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

storiesOf('Form', module)
    .add('Basico', () => {
      return (
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
      )
  })
  .add('Com níveis em Abas', () => {

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

    return (
      <Form>
        <Tab titles={['Dados Pessoais', 'Endereços']} content={[dadosPessoais(), dadosEnderecos()]} />
        <br/>
        <FormButton onClick={(form) => alert(JSON.stringify(form))}>Submit</FormButton>
      </Form>
    )
});
