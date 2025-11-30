# Quick Reference: AIDC Barcode Toolkit

## Installation

```bash
npm install aidc-barcode-toolkit
```

## Usage

### Generate Barcode
```javascript
const { generateBarcode } = require('aidc-barcode-toolkit');

generateBarcode({
  data: '012345678905',
  format: 'EAN13',
  width: 400,
  height: 150
}).then(dataUrl => console.log(dataUrl));
```

### Generate QR Code
```javascript
const { generateQRCode } = require('aidc-barcode-toolkit');

generateQRCode({
  data: 'https://example.com',
  ecc: 'H',
  size: 400
}).then(dataUrl => console.log(dataUrl));
```

### Validate GTIN
```javascript
const { validateGTIN } = require('aidc-barcode-toolkit');

const isValid = validateGTIN('012345678905');
console.log(isValid); // true or false
```

### Parse GS1 Data
```javascript
const { parseGS1 } = require('aidc-barcode-toolkit');

const result = parseGS1('010978013409341317250510AB123');
console.log(result); // { GTIN: '9780134093413', ...}
```

### Generate Thermal Printer Commands
```javascript
const { generateThermalPrinter } = require('aidc-barcode-toolkit');

generateThermalPrinter({
  data: 'Hello, Printer!',
  format: 'ZPL',
  printerModel: 'ZEBRA_GK420'
}).then(commands => console.log(commands));
```

## MCP Integration

### Claude Desktop
Edit `~/.config/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "aidc-barcode": {
      "command": "npx",
      "args": ["aidc-barcode-toolkit"]
    }
  }
}
```

Restart Claude. Now you can use:
- `generate_barcode`
- `generate_qr`
- `validate_gtin`
- `parse_gs1`
- `generate_thermal_printer`

### Cline
Add to `.cline/servers.json`:

```json
{
  "mcpServers": {
    "aidc-barcode": {
      "command": "npx",
      "args": ["aidc-barcode-toolkit"]
    }
  }
}
```

## Supported Formats

### Barcode Formats
- EAN-13 (European Article Number)
- UPC-A (Universal Product Code)
- Code 128 (Alphanumeric)
- Code 39 (Alphanumeric)
- ITF-14 (Interleaved 2 of 5)

### QR Error Correction
- L (Low - ~7% recovery)
- M (Medium - ~15% recovery)
- Q (Quartile - ~25% recovery)
- H (High - ~30% recovery)

### Thermal Printer Formats
- ZPL (Zebra Programming Language)
- ESC/POS (Epson Standard Code for POS)
- TSPL (TSC Programming Language)

## Links

- **npm**: https://www.npmjs.com/package/aidc-barcode-toolkit
- **GitHub**: https://github.com/rmjoe99/aidc-barcode-toolkit
- **Open VSX**: https://open-vsx.org/extension/josephrwanda/aidc-barcode-toolkit
- **Documentation**: https://github.com/rmjoe99/aidc-barcode-toolkit/blob/main/README.md
- **Issues**: https://github.com/rmjoe99/aidc-barcode-toolkit/issues

## Support

Email: josephrwanda9@gmail.com
