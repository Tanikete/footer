import { render } from '@testing-library/react';

import RegisterLogin from './register-login';

describe('RegisterLogin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RegisterLogin />);
    expect(baseElement).toBeTruthy();
  });
});
