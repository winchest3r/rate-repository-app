import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

import SignInContainer from '../../components/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();

      render(<SignInContainer onSubmit={onSubmit} />);

      fireEvent.changeText(screen.getByPlaceholderText('username'), 'superuser');
      fireEvent.changeText(screen.getByPlaceholderText('password'), 'superpassword');
      fireEvent.press(screen.getByText('Sign In'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });

      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'superuser',
        password: 'superpassword'
      });
    });
  });
});