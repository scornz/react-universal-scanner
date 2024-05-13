/**
 * Code used and modified from preflower/react-barcode-scanner.
 * @see {@link https://github.com/preflower/react-barcode-scanner}
 */

import { type RefObject, useCallback, useEffect, useMemo } from 'react';
import { BarcodeDetectorPolyfill } from '@/utils';
import type { DetectedCode } from '@/types';

export interface ScanOptions {
  delay?: number;
  formats?: string[];
}

const DEFAULT_OPTIONS = {
  formats: ['qr_code'],
  delay: 60,
};

/**
 *
 * @param ref A reference to the video element.
 * @param provideOptions
 * @returns
 */
export function useScan(
  ref: RefObject<HTMLVideoElement>,
  onScan: (barcode: DetectedCode) => void,
  scanning: boolean = true,
  opts?: ScanOptions,
) {
  // Combine default options and user provided options
  const options = useMemo(() => {
    return { ...DEFAULT_OPTIONS, ...opts };
  }, [opts]);

  const scan = useCallback(async () => {
    if (!scanning) return;

    const target = ref.current;
    const detector = new BarcodeDetectorPolyfill({
      formats: options.formats,
    });
    const [detected] = await detector.detect(target!);
    if (detected !== undefined) {
      onScan(detected);
    }
  }, [ref, options.formats, scanning, onScan]);

  useEffect(() => {
    const target = ref.current;
    if (target == null || !scanning) return;

    /**
     * proivde `cancelled` tag to prevent `frame` has been
     * triggered but `scan` not fulfilled when call cancelAnimationFrame
     */
    let cancelled = false;
    let timer: number;
    const frame = async (): Promise<void> => {
      await scan();
      if (!cancelled) {
        timer = window.setTimeout(frame, options.delay);
      }
    };
    timer = window.setTimeout(frame, options.delay);
    return () => {
      clearTimeout(timer);
      cancelled = true;
    };
  }, [ref, options.delay, scan, scanning]);
}
