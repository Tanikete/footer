import { render } from '@testing-library/react';

import DeleteAccountProjectOrganism from './delete-account';

describe('DeleteAccountProjectOrganism', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeleteAccountProjectOrganism />);
    expect(baseElement).toBeTruthy();
  });
});
