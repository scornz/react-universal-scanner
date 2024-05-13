/**
 * Creates a promise that resolves or rejects based on the specified events on a target element.
 * This function abstracts the event listener pattern into a promise, allowing for cleaner asynchronous code.
 *
 * @param target The HTML element that emits the events.
 * @param event The name of the event that resolves the promise.
 * @param errorEvent The name of the event that rejects the promise. Defaults to 'error'.
 * @returns A promise that resolves with the event object when the specified event occurs or rejects if the error event occurs.
 */
export const eventListener = async <T extends HTMLElement>(
  target: T,
  event: string,
  errorEvent: string = 'error',
): Promise<Event> => {
  return new Promise<Event>((resolve, reject) => {
    const onEvent = (e: Event) => resolve(e);
    const onError = (e: Event) => reject(e);

    target.addEventListener(event, onEvent, { once: true });
    target.addEventListener(errorEvent, onError, { once: true });
  });
};

/**
 * Wait for a specified number of milliseconds.
 * @param milliseconds The number of milliseconds to wait
 */
export const timeout = async (milliseconds: number): Promise<void> => {
  return await new Promise((resolve) => setTimeout(resolve, milliseconds));
};
