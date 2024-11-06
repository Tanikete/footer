import { render } from '@testing-library/react';

import VideosBanner from './videos-banner';

describe('VideosBanner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VideosBanner />);
    expect(baseElement).toBeTruthy();
  });
});
