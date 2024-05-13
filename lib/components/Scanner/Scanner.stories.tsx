import type { Meta, StoryObj } from '@storybook/react';

import { type DetectedCode } from '@/types';
import { type ScannerProps } from '.';
import Scanner from './Scanner';

const meta = {
  title: 'Components/Scanner',
  component: Scanner,
  parameters: {
    controls: {
      include: ['scanning'],
    },
    layout: 'centered',
  },
} satisfies Meta<typeof Scanner>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: ScannerProps = {
  onScan: (code: DetectedCode) => console.log('Scanned Code:', code),
  style: { width: '300px', height: '300px' },
};

export const Default: Story = {
  args: {
    ...defaultProps,
    scanning: true,
    onScan: (code: DetectedCode) => console.log('Scanned Code:', code),
  },
};

export const ScanningDisabled: Story = {
  args: {
    ...defaultProps,
    scanning: false,
  },
};
