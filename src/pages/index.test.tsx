import { render, screen } from '@testing-library/react';
import Home from './index';
import React from 'react';

describe("homepage test", () => {
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

  test('render by snapshot', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot();
  })
})