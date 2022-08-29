import { render, screen } from '@testing-library/react';
import InviteModal from './index';
import userEvent from '@testing-library/user-event';

describe("invite-modal test", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
  });

  test('renders SuccessModal without show by snapshot', () => {
    render(<InviteModal show={false} setShow={() => {
    }} onSuccess={() => {
    }} />)
    expect(screen.queryByText('Request an invite')).toBeNull();
  })

  test('renders SuccessModal with show by snapshot', () => {
    render(<InviteModal show={true} setShow={() => {
    }} onSuccess={() => {
    }} />)
    expect(screen.getByText('Request an invite')).toBeInTheDocument();
  })

  test('submit when no info has been entered', async () => {
    render(<InviteModal show={true} setShow={() => {
    }} onSuccess={() => {
    }} />)
    await userEvent.click(screen.getByRole('submit'));
    expect(await screen.findByText('Please input your full name!')).toBeInTheDocument();
    expect(await screen.findAllByText('Please input your email!')).toHaveLength(2);
  })

  test('submit when no email has been entered', async () => {
    render(<InviteModal show={true} setShow={() => {
    }} onSuccess={() => {
    }} />)
    await userEvent.type(screen.getByRole('name'), 'cheng');
    await userEvent.click(screen.getByRole('submit'));
    expect(await screen.queryByText('Please input your full name!')).toBeNull()
    expect(await screen.findAllByText('Please input your email!')).toHaveLength(2);
  })

  test('submit when confirm email has been entered', async () => {
    render(<InviteModal show={true} setShow={() => {
    }} onSuccess={() => {
    }} />)
    await userEvent.type(screen.getByRole('name'), 'cheng');
    await userEvent.type(screen.getByRole('email'), '18732131@qq.com');
    await userEvent.click(screen.getByRole('submit'));
    expect(await screen.queryByText('Please input your full name!')).toBeNull()
    expect(await screen.findAllByText('Please input your email!')).toHaveLength(1);
  })

  test('submit when two emails are different', async () => {
    render(<InviteModal show={true} setShow={() => {
    }} onSuccess={() => {
    }} />)
    await userEvent.type(screen.getByRole('name'), 'cheng');
    await userEvent.type(screen.getByRole('email'), '18732131@qq.com');
    await userEvent.type(screen.getByRole('confirmedEmail'), '187321399991@qq.com');
    await userEvent.click(screen.getByRole('submit'));
    expect(await screen.queryByText('Please input your full name!')).toBeNull();
    expect(await screen.queryByText('Please input your email!')).toBeNull();
    expect(await screen.findByText('two emails are different!')).toBeInTheDocument();
  })

  test('submit when enter an invalid name', async () => {
    render(<InviteModal show={true} setShow={() => {
    }} onSuccess={() => {
    }} />)
    await userEvent.type(screen.getByRole('name'), 'cheng()(*&&!#');
    await userEvent.click(screen.getByRole('submit'));
    expect(await screen.findByText('Please input the correct full name!')).toBeInTheDocument()
  })

  test('submit when enter an invalid email', async () => {
    render(<InviteModal show={true} setShow={() => {
    }} onSuccess={() => {
    }} />)
    await userEvent.type(screen.getByRole('email'), 'cheng()(*&&!#');
    await userEvent.click(screen.getByRole('submit'));
    expect(await screen.findByText('Please input the correct email address!')).toBeInTheDocument()
  })

  test('submit when all infos has been validated', async () => {
    render(<InviteModal show={true} setShow={() => {
    }} onSuccess={() => {
    }} />)
    await userEvent.type(screen.getByRole('name'), 'cheng');
    await userEvent.type(screen.getByRole('email'), '12345678@qq.com');
    await userEvent.type(screen.getByRole('confirmedEmail'), '12345678@qq.com');
    await userEvent.click(screen.getByRole('submit'));
    // doing submit
    expect(await screen.findByText('Sending, please wait...')).toBeInTheDocument();
  })
})