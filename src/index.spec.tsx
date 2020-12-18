import * as React from 'react';
import { render } from '@testing-library/react';
import ExampleComponent from "./";

test("create a new hello", () => {
  const { getByText } = render(<ExampleComponent text={'Mundo'} />)
  expect(getByText('Hello Mundo')).not.toBeNull();
});