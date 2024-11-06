import { render } from '@testing-library/react';
import AccountInformation from './account-information';
import { UpdateProfileType } from './account-information-schema';


describe('AccountInformation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountInformation onSubmit={function (values: UpdateProfileType): void {
      throw new Error('Function not implemented.');
    } } />);
    expect(baseElement).toBeTruthy();
  });
});