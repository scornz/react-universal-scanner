import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { mockGlobal } from './mock';

/** Mock all necessary global */
mockGlobal();

afterEach(() => {
  cleanup();
});
