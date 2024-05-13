/**
 * Localize all polyfill for the barcode detector here. This will allow us to easily
 * mock the polyfill in tests, and prevent loading the webassembly module in the tests.
 */

import { BarcodeDetectorPolyfill, type DetectedBarcode } from '@undecaf/barcode-detector-polyfill';

export { BarcodeDetectorPolyfill, type DetectedBarcode };
