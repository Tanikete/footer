import { render } from '@testing-library/react';

import SuccessBanner from './success-banner';

describe('SuccessBanner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SuccessBanner />);
    expect(baseElement).toBeTruthy();
  });
});
