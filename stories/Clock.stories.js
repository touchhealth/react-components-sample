import React from 'react';

import { storiesOf } from '@storybook/react';

import Clock from '../src/Clock';

storiesOf('Clock', module)
    .add('Basico', () => {
      return (
        <Clock />
      );
  });
