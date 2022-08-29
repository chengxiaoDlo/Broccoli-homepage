import { render, screen } from '@testing-library/react';
import SuccessModal from './index';
import userEvent from '@testing-library/user-event';

describe("success-modal test", () => {
  test('renders SuccessModal without show by snapshot', () => {
    render(<SuccessModal show={false} setShow={() => {}} />)
    expect(screen.queryByText('All done!')).toBeNull();
  })

  test('renders SuccessModal with show by snapshot', () => {
    render(<SuccessModal show={true} setShow={() => {}} />)
    expect(screen.getByText('All done!')).toBeInTheDocument();
  })

  test('OK btn click', async () => {
    const setShow = jest.fn();
    render(<SuccessModal show={true} setShow={setShow} /> )
    await userEvent.click(screen.getByRole('OkBtn'));
    expect(setShow).toHaveBeenCalledTimes(1);
  })

})

