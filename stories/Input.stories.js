import React from 'react';

import { storiesOf } from '@storybook/react';

import Input from '../src/Input';

storiesOf('Input', module)
    .add('Basico', () => {
      return (
        <Input />
      );
  });
