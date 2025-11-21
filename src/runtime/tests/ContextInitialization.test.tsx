import React from 'react';
import { render } from '@testing-library/react';
import { RuntimeProvider } from '../RuntimeContext';

test('RuntimeProvider renders without crashing', () => {
  render(<RuntimeProvider><div>ok</div></RuntimeProvider>);
});
