/**
 * Code used and modified from preflower/react-barcode-scanner.
 * @see {@link https://github.com/preflower/react-barcode-scanner}
 */

import { type RefObject, useEffect, useMemo, useState } from 'react';
import { eventListener, timeout } from '@/utils';

/**
 * These are the default settings applied to the camera.
 */
const DEFAULT_CONSTRAINTS: MediaTrackConstraints = {
  width: { min: 640, ideal: 1280 },
  height: { min: 480, ideal: 720 },
  facingMode: {
    ideal: 'environment',
  },
  advanced: [{ width: 1920, height: 1280 }, { aspectRatio: 1.333 }],
};

/**
 * Use the camera and display output in the given video element.
 * @param ref A reference to the video element
 * @param trackConstraints Media constraints as defined in MDN docs
 * @returns A boolean indicating whether the camera is supported
 */
export const useCamera = (
  ref: RefObject<HTMLVideoElement>,
  trackConstraints?: MediaTrackConstraints,
): [boolean] => {
  const [cameraSupported, setCameraSupported] = useState(false);
  if (!window.isSecureContext) {
    throw new Error('Camera is only supported in secure context');
  }
  const [, setStream] = useStreamState();

  /** Define the contraints */
  const constraints = useMemo(() => {
    /// Combine constraints into single object
    const videoConstraints = { ...DEFAULT_CONSTRAINTS, ...trackConstraints };
    return {
      // No audio required
      audio: false,
      video: videoConstraints,
    };
  }, [trackConstraints]);

  useEffect(() => {
    let stream: MediaStream;
    const fetch = async (): Promise<void> => {
      const target = ref.current;
      // If there is no ref simply return until it is available
      if (target == null) return;

      // Get the stream from the camera
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      target.srcObject = stream;
      // Wait for the stream to be ready
      await eventListener(target, 'loadeddata');
      // Get capabilities only returns a non-empty object after some delay, but
      // we need to wait for the stream to be ready to get the capabilities
      await timeout(500);

      setCameraSupported(true);
      setStream(stream);
    };
    void fetch();
    return () => {
      // Stop the stream when the component unmounts
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [ref, constraints, setStream]);

  return [cameraSupported];
};

type SubscriberFunc = (newState: MediaStream) => void;
const subscriptions: SubscriberFunc[] = [];

function set(newValue: MediaStream): void {
  setTimeout(() => {
    subscriptions.forEach((c) => c(newValue));
  });
}

/**
 * Maintain MediaStream state and add it to global subscriptions list.
 * @returns The stream state and a function to set the stream state
 */
const useStreamState = (): [MediaStream | undefined, (newState: MediaStream) => void] => {
  const [stream, setStream] = useState<MediaStream>();

  useEffect(() => {
    const index = subscriptions.push(setStream);
    return () => {
      subscriptions.splice(index, 1);
    };
  }, []);

  return [stream, set];
};
