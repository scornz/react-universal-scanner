import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Scanner from './Scanner';

describe('Scanner component', () => {
  it('should render a scanner', () => {
    const scan = vi.fn();
    render(
      <Scanner
        onScan={scan}
        data-testid="scanner"
      ></Scanner>,
    );
    expect(screen.getByTestId('scanner')).toBeInTheDocument();
    // Make sure the scan function isn't called upon render
    expect(scan).not.toHaveBeenCalled();
  });
});
