import { render } from '@testing-library/react';

import FairplayBanner from './fairplay-banner';

describe('FairplayBanner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FairplayBanner />);
    expect(baseElement).toBeTruthy();
  });
});
