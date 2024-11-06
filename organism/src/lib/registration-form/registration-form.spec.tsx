import { render } from '@testing-library/react';

import RegistrationForm from './registration-form';
import { RegistrationType } from './registration-form-schema';

describe('FormSignup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RegistrationForm onSubmit={function (values: RegistrationType): void {
      throw new Error('Function not implemented.');
    } } />);
    expect(baseElement).toBeTruthy();
  });
});
