import { render } from '@testing-library/react';

import VideoCard from './video-card';

describe('VideoCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VideoCard />);
    expect(baseElement).toBeTruthy();
  });
});
