import { render } from '@testing-library/react';

import LogoutProjectOrganism from './logout';

describe('LogoutProjectOrganism', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LogoutProjectOrganism />);
    expect(baseElement).toBeTruthy();
  });
});
