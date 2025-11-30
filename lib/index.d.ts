/**
 * AIDC Barcode Toolkit - TypeScript Definitions
 */

export interface BarcodeOptions {
  format?: 'EAN13' | 'UPCA' | 'CODE128' | 'CODE39' | 'ITF14' | 'QR';
  width?: number;
  height?: number;
  output?: string;
}

export interface BarcodeResult {
  success: boolean;
  data: string;
  format: string;
  output: string;
  width: number;
  height: number;
  generated: string;
  message: string;
}

export interface QROptions {
  ecc?: 'L' | 'M' | 'Q' | 'H';
  size?: number;
  output?: string;
}

export interface QRResult {
  success: boolean;
  data: string;
  errorCorrection: string;
  errorCorrectionCapacity: string;
  output: string;
  size: number;
  generated: string;
  message: string;
}

export interface GTINValidationResult {
  valid: boolean;
  gtin?: string;
  checkDigit?: number;
  providedCheckDigit?: number;
  code?: string;
  error?: string;
  message: string;
}

export interface GS1ParseResult {
  success: boolean;
  parsed: Record<string, any>;
  raw: string;
  message: string;
}

export interface ThermalPrinterOptions {
  format?: 'ZPL' | 'ESC_POS' | 'TSPL';
  printerModel?: string;
}

export interface ThermalPrinterResult {
  success: boolean;
  format: string;
  printerModel: string;
  commands: string | Record<string, any>;
  message: string;
}

export function generateBarcode(
  data: string,
  options?: BarcodeOptions
): Promise<BarcodeResult>;

export function generateQRCode(
  data: string,
  options?: QROptions
): Promise<QRResult>;

export function validateGTIN(code: string): GTINValidationResult;

export function parseGS1(data: string): GS1ParseResult;

export function generateThermalPrinter(
  data: string,
  options?: ThermalPrinterOptions
): ThermalPrinterResult;

export const version: string;
