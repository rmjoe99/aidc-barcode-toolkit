/**
 * AIDC Barcode Toolkit - VS Code Extension
 * Integrates professional barcode generation into VS Code
 */

const vscode = require('vscode');
const barcode = require('../lib/index');

function activate(context) {
  console.log('✅ AIDC Barcode Toolkit activated');

  // Command 1: Generate Barcode
  const generateBarcode = vscode.commands.registerCommand(
    'aidc.generateBarcode',
    async () => {
      const data = await vscode.window.showInputBox({
        prompt: 'Enter data to encode',
        placeHolder: '012345678905',
        validateInput: (value) => {
          if (!value) return 'Data is required';
          if (value.length > 100) return 'Data too long (max 100 characters)';
          return null;
        }
      });

      if (!data) return;

      const format = await vscode.window.showQuickPick(
        [
          { label: 'EAN-13', description: 'European retail' },
          { label: 'UPC-A', description: 'US retail' },
          { label: 'CODE128', description: 'Logistics & shipping' },
          { label: 'CODE39', description: 'Warehouse labels' },
          { label: 'QR', description: 'Digital linking' }
        ],
        { placeHolder: 'Select barcode format' }
      );

      if (!format) return;

      try {
        const result = await barcode.generateBarcode(data, {
          format: format.label === 'QR' ? 'QR' : format.label.split('-')[0]
        });

        vscode.window.showInformationMessage(
          `✅ ${result.message}\n📁 ${result.output}`
        );
      } catch (error) {
        vscode.window.showErrorMessage(`❌ Error: ${error.message}`);
      }
    }
  );

  // Command 2: Validate GTIN
  const validateGTIN = vscode.commands.registerCommand(
    'aidc.validateGTIN',
    async () => {
      const code = await vscode.window.showInputBox({
        prompt: 'Enter GTIN code to validate',
        placeHolder: '012345678905'
      });

      if (!code) return;

      try {
        const result = barcode.validateGTIN(code);
        const message = result.valid
          ? `✅ Valid ${result.gtin}\nCheck Digit: ${result.checkDigit}`
          : `❌ Invalid check digit\nExpected: ${result.checkDigit}\nGot: ${result.providedCheckDigit}`;

        vscode.window.showInformationMessage(message);
      } catch (error) {
        vscode.window.showErrorMessage(`❌ Error: ${error.message}`);
      }
    }
  );

  // Command 3: Generate QR Code
  const generateQR = vscode.commands.registerCommand(
    'aidc.generateQR',
    async () => {
      const data = await vscode.window.showInputBox({
        prompt: 'Enter data for QR code',
        placeHolder: 'https://example.com'
      });

      if (!data) return;

      const ecc = await vscode.window.showQuickPick(
        [
          { label: 'L (~7%)', description: 'Low recovery' },
          { label: 'M (~15%)', description: 'Medium recovery' },
          { label: 'Q (~25%)', description: 'Good recovery' },
          { label: 'H (~30%)', description: 'High recovery (recommended)' }
        ],
        { placeHolder: 'Error correction level' }
      );

      if (!ecc) return;

      try {
        const result = await barcode.generateQRCode(data, {
          ecc: ecc.label[0]
        });

        vscode.window.showInformationMessage(
          `✅ ${result.message}\n${result.errorCorrectionCapacity}\n📁 ${result.output}`
        );
      } catch (error) {
        vscode.window.showErrorMessage(`❌ Error: ${error.message}`);
      }
    }
  );

  // Command 4: Parse GS1
  const parseGS1 = vscode.commands.registerCommand(
    'aidc.parseGS1',
    async () => {
      const data = await vscode.window.showInputBox({
        prompt: 'Enter GS1 data string',
        placeHolder: '010978013409341317250510AB123'
      });

      if (!data) return;

      try {
        const result = barcode.parseGS1(data);
        const parsed = Object.entries(result.parsed)
          .map(([key, val]) => `${key}: ${val.value}`)
          .join('\n');

        vscode.window.showInformationMessage(
          `✅ ${result.message}\n\n${parsed}`
        );
      } catch (error) {
        vscode.window.showErrorMessage(`❌ Error: ${error.message}`);
      }
    }
  );

  context.subscriptions.push(generateBarcode, validateGTIN, generateQR, parseGS1);
}

function deactivate() {}

module.exports = { activate, deactivate };
