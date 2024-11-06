import { render } from '@testing-library/react';

import BasicBanner from './basic-banner';

describe('BasicBanner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BasicBanner />);
    expect(baseElement).toBeTruthy();
  });
});
