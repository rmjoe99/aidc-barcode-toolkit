# Getting Started with AIDC Barcode Toolkit

Quick guide to get up and running in 5 minutes.

## Installation

### For Claude Code Users

```bash
# Add marketplace
/plugin marketplace add rmjoe99/aidc-barcode-toolkit

# Install plugin
/plugin install aidc-barcode-toolkit

# Verify installation
/plugin list
```

### For Node.js Projects

```bash
# Install from npm (coming soon)
npm install aidc-barcode-toolkit

# Or install from GitHub
npm install git+https://github.com/rmjoe99/aidc-barcode-toolkit.git
```

## Basic Usage

### 1. Generate Your First Barcode

```bash
/generate-barcode --data "012345678905" --format EAN13
```

**Output:**
```
✅ Barcode generated successfully!
📁 Output: ./barcodes/EAN13_012345678905.png
📐 Size: 400x200 pixels
✓ Valid GTIN-13 with correct check digit
```

### 2. Generate a QR Code

```bash
/generate-qr --data "https://josephrwanda.com" --ecc H
```

**Output:**
```
✅ QR Code generated successfully!
📁 Output: ./barcodes/QR_hash_timestamp.png
📐 Size: 400x400 pixels
🛡️ Error Correction: H (~30% recovery)
```

### 3. Validate a GTIN

```bash
/validate-barcode --code "012345678905"
```

**Output:**
```
✅ Valid GTIN-13 (EAN-13)
Check Digit: 5 (Verified)
Ready for retail use
```

## Natural Language Interface

Just describe what you need:

```
You: "Generate barcodes for products ABC001, ABC002, ABC003"

Claude: I'll generate Code 128 barcodes for those product codes.

[Generates 3 barcodes automatically]

✅ ABC001 → ./barcodes/CODE128_ABC001.png
✅ ABC002 → ./barcodes/CODE128_ABC002.png
✅ ABC003 → ./barcodes/CODE128_ABC003.png

All barcodes ready for printing!
```

## Common Use Cases

### Retail Product Labels

```javascript
const barcode = require('aidc-barcode-toolkit');

// Generate EAN-13 for retail product
await barcode.generateBarcode('5901234567890', {
  format: 'EAN13',
  width: 300,
  height: 150,
  output: './product-label.png'
});
```

### Warehouse Location Codes

```javascript
// Generate Code 39 for warehouse locations
await barcode.generateBarcode('AISLE-A1', {
  format: 'CODE39',
  width: 350,
  height: 150,
  output: './location-label.png'
});
```

### Shipping Labels

```javascript
// Generate Code 128 for tracking numbers
await barcode.generateBarcode('1Z999AA10123456784', {
  format: 'CODE128',
  width: 400,
  height: 150,
  output: './shipping-label.png'
});
```

## Next Steps

- [Command Reference](commands.md) - All available commands
- [API Documentation](api.md) - Programmatic usage
- [Use Cases](use-cases/) - Industry-specific examples
- [Troubleshooting](troubleshooting.md) - Common issues

## Need Help?

- **GitHub Issues**: [Report bugs or request features](https://github.com/rmjoe99/aidc-barcode-toolkit/issues)
- **Email**: sales@origamitech.co.ke
- **Website**: [josephrwanda.com](https://josephrwanda.com)

---

**Built by Joseph Rwanda | Enterprise AIDC Expert**
