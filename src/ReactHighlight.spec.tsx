import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ReactHighlight from './ReactHighlight';

it('should render correctly', () => {
  const { container } = render(<ReactHighlight searchTerm="test" text="testing result" />);
  expect(container).toMatchSnapshot();
});
