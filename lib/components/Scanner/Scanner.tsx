import { useRef } from 'react';

import { useCamera, useScan } from '@/utils';
import type { DetectedCode } from '@/types';

export type ScannerProps = {
  onScan: (code: DetectedCode) => void;
  scanning?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * The Scanner component initializes a video feed from the user's camera and scans for QR or barcodes.
 *
 * Props:
 * - onScan (function): Callback function that is invoked with the detected code.
 * - ...props (React.HTMLAttributes<HTMLDivElement>): Additional props passed to the div element.
 *
 * Usage:
 * The component should be used where a QR or barcode scanning functionality is needed. Ensure that permissions
 * for using the camera are handled appropriately in the parent application.
 *
 * Example:
 * ```tsx
 * <Scanner onScan={(code) => console.log(code.rawValue)} />
 * ```
 *
 * Notes:
 * - The video element within this component is styled to fit its container. It is set to autoplay, muted, and plays inline,
 *   which are typical settings for in-app camera use to avoid playback controls and ensure smooth operation.
 * - The component conditionally renders the video element only if the camera is supported on the device.
 */
function Scanner({ onScan, scanning = true, ...props }: ScannerProps) {
  const video = useRef<HTMLVideoElement>(null);
  useCamera(video);

  /**
   * Begin scanning for codes
   */
  useScan(video, onScan, scanning);

  return (
    <div {...props}>
      <video
        ref={video}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        autoPlay
        muted
        playsInline
      />
    </div>
  );
}

export default Scanner;
