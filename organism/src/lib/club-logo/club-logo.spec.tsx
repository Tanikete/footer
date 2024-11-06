import { render } from '@testing-library/react';

import ClubLogo from './club-logo';

describe('ClubLogo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClubLogo />);
    expect(baseElement).toBeTruthy();
  });
});
