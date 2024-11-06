import { render } from '@testing-library/react';

import SmallCard from './small-card';

describe('SmallCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SmallCard />);
    expect(baseElement).toBeTruthy();
  });
});
