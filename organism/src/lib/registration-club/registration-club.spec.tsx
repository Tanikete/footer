import { render } from '@testing-library/react';

import RegistrationClub from './registration-club';

describe('RegistrationClub', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RegistrationClub />);
    expect(baseElement).toBeTruthy();
  });
});
