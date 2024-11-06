import { render } from '@testing-library/react';

import MobileDetect from './mobile-detect';

describe('MobileDetect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MobileDetect />);
    expect(baseElement).toBeTruthy();
  });
});
