import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    // mock func fun in browser to not send req to be
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({ 
      json: async () => [{ id: 'p1', title: 'First post' }],
    });
    render(<Async />);

    // ref  to get item by role 
    // https://www.w3.org/TR/html-aria/#docconformance
    const listItemElements = await screen.findAllByRole('listitem'); // find her not get as it return a promise u wait to 
    expect(listItemElements).not.toHaveLength(0);
  });
});
