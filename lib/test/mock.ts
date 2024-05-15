import { vi } from 'vitest';

export const mockGlobal = () => {
  // Mock MediaStream
  global.MediaStream = vi.fn().mockImplementation(() => ({
    addTrack: vi.fn(),
    removeTrack: vi.fn(),
    getTracks: vi.fn(() => []),
    getVideoTracks: vi.fn(() => []),
    getAudioTracks: vi.fn(() => []),
  }));

  // Mock MediaStreamTrack
  global.MediaStreamTrack = vi.fn().mockImplementation(() => ({
    stop: vi.fn(),
  }));

  // Mocking window.isSecureContext
  Object.defineProperty(window, 'isSecureContext', {
    value: true,
    writable: false,
  });

  // Mocking navigator.mediaDevices.getUserMedia
  Object.defineProperty(global.navigator, 'mediaDevices', {
    writable: true,
    value: {
      getUserMedia: vi.fn().mockResolvedValue(new MediaStream([new MediaStreamTrack()])),
    },
  });

  // @undecaf/barcode-detector-polyfill dynamically pulls zbar WASM files, so we need to mock it
  vi.mock('@undecaf/barcode-detector-polyfill', () => {
    return {
      // We do not need to provide any functionality here, so we can just return an empty object
      blank: vi.fn(() => {}),
    };
  });
};
