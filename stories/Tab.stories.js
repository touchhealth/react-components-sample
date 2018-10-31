import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Tab from '../src/Tab';

storiesOf('Tab', module)
    .add('Basico', () => {
      let titles = ['Aba1', 'Aba2', 'Aba3'];
      let content = [];
      content.push(<div>Conteudo da Aba1</div>);
      content.push(<div>Conteudo da Aba2</div>);
      content.push(<div>Conteudo da Aba3</div>);
      return (
        <Tab titles={titles} content={content} />
      );
  });
