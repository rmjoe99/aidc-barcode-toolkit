# 🏷️ AIDC Barcode Toolkit for Claude Code

![GitHub stars](https://img.shields.io/github/stars/rmjoe99/aidc-barcode-toolkit?style=social)
![GitHub forks](https://img.shields.io/github/forks/rmjoe99/aidc-barcode-toolkit?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/rmjoe99/aidc-barcode-toolkit?style=social)
![License](https://img.shields.io/github/license/rmjoe99/aidc-barcode-toolkit)
![GitHub last commit](https://img.shields.io/github/last-commit/rmjoe99/aidc-barcode-toolkit)

> Professional barcode generation, GS1 validation & thermal printing. Built by enterprise AIDC experts.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Joseph%20Rwanda-blue)](https://linkedin.com/in/josephrwanda)
[![Website](https://img.shields.io/badge/Website-josephrwanda.com-green)](https://josephrwanda.com)
[![Email](https://img.shields.io/badge/Email-sales%40origamitech.co.ke-red)](mailto:sales@origamitech.co.ke)

## ⚡ Quick Install

```bash
/plugin marketplace add rmjoe99/aidc-barcode-toolkit
/plugin install aidc-barcode-toolkit
```

## ✨ Features

- **Barcode Generation**: EAN-13, UPC-A, Code 128, Code 39, ITF-14, QR Codes
- **GS1 Validation**: GTIN check digits, Application Identifier parsing
- **Thermal Printing**: Zebra ZPL, ESC/POS, TSPL support
- **Natural Language**: Just ask - no complex commands
- **Enterprise Grade**: Tested with Honeywell, Zebra, Datalogic hardware

## 🎯 Perfect For

- 🏭 **Warehouse Automation** - Location labels, inventory tracking
- 🛒 **Retail & E-Commerce** - Product labeling, price tags
- 💊 **Healthcare** - Medication tracking (FDA, EU FMD compliant)
- 📦 **Logistics** - Shipping labels, container codes
- 🏭 **Manufacturing** - Asset management, serial numbers

## 🚀 Usage Examples

### Generate Barcode
```bash
/generate-barcode --data "012345678905" --format EAN13
```

### Generate QR Code
```bash
/generate-qr --data "https://example.com/product/123" --ecc H
```

### Validate GTIN
```bash
/validate-barcode --code "012345678905"
```

### Natural Language (Auto-detection)
```
You: "Generate barcodes for products SKU001, SKU002, SKU003"
Claude: ✅ Generated 3 Code 128 barcodes in ./barcodes/
```

## 💻 Programmatic Usage

```javascript
const barcode = require('aidc-barcode-toolkit');

// Generate EAN-13 barcode
const result = await barcode.generateBarcode('012345678905', {
  format: 'EAN13',
  output: './product-barcode.png'
});

// Validate GTIN with check digit
const validation = barcode.validateGTIN('012345678905');
console.log(validation.valid); // true

// Parse GS1 Application Identifiers
const parsed = barcode.parseGS1('010978013409341317250510AB123');
console.log(parsed.parsed['GTIN']); // 09780134093413
console.log(parsed.parsed['Expiry Date']); // May 10, 2025
```

## 📚 Documentation

- [Getting Started Guide](docs/getting-started.md)
- [Command Reference](docs/commands.md)
- [API Documentation](docs/api.md)
- [Use Cases](docs/use-cases/)

## 🏆 Why Choose AIDC Toolkit?

### Built by AIDC Experts
- ✅ 5+ years enterprise AIDC experience
- ✅ 50+ client deployments (warehouse, healthcare, manufacturing)
- ✅ Honeywell Partner of the Year recognition
- ✅ Zebra RFID Product Certification
- ✅ Featured in Floriculture Magazine for innovation

### Production-Tested
- ✅ Validated with Honeywell, Zebra, Datalogic scanners
- ✅ Thermal printer compatibility (ZPL, ESC/POS, TSPL)
- ✅ GS1 standards compliant
- ✅ FDA, EU FMD, DSCSA ready

### Developer-Friendly
- ✅ Natural language interface
- ✅ Comprehensive error handling
- ✅ Detailed documentation
- ✅ Active community support

## 🎓 Real-World Use Cases

### E-Commerce Product Labeling
```javascript
// Generate EAN-13 for product catalog
const products = ['5901234567890', '5901234567891', '5901234567892'];

for (const gtin of products) {
  await barcode.generateBarcode(gtin, {
    format: 'EAN13',
    output: `./labels/${gtin}.png`
  });
}
```

### Warehouse Location Barcodes
```javascript
// Create location labels for warehouse sections
const aisles = ['A', 'B', 'C'];
const shelves = 10;

for (const aisle of aisles) {
  for (let shelf = 1; shelf <= shelves; shelf++) {
    const location = `${aisle}${shelf}`;
    await barcode.generateBarcode(location, {
      format: 'CODE39',
      output: `./warehouse/${location}.png`
    });
  }
}
```

### Healthcare GS1 Serialization
```javascript
// Parse pharmaceutical GS1 barcode
const gs1Data = '010978013409341317250510SN12345';
const parsed = barcode.parseGS1(gs1Data);

console.log('GTIN:', parsed.parsed['GTIN'].value);
console.log('Expiry:', parsed.parsed['Expiry Date'].formatted.readable);
console.log('Serial:', parsed.parsed['Serial Number'].value);
```

Built by **Joseph Rwanda**, Technical Solutions Architect at Origami Tech with:
- 5+ years enterprise AIDC expertise
- 50+ client deployments (warehouse, healthcare, manufacturing)
- Honeywell Partner of the Year recognition
- Zebra RFID Product Certification
- Featured in Floriculture Magazine for innovation

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 📞 Contact & Support

- **Website**: [josephrwanda.com](https://josephrwanda.com)
- **Email**: sales@origamitech.co.ke
- **LinkedIn**: [josephrwanda](https://linkedin.com/in/josephrwanda)
- **GitHub**: [rmjoe99](https://github.com/rmjoe99)

## 🙏 Acknowledgments

Built with:
- [jsbarcode](https://github.com/lindell/JsBarcode) - 1D barcode generation
- [node-qrcode](https://github.com/soldair/node-qrcode) - QR code generation
- [bwip-js](https://github.com/metafloor/bwip-js) - Advanced barcode formats
- Tested with Honeywell, Zebra, Datalogic hardware

## ⭐ Star History

If this plugin helps your workflow, please ⭐ star the repo!

[![Star History Chart](https://api.star-history.com/svg?repos=rmjoe99/aidc-barcode-toolkit&type=Date)](https://star-history.com/#rmjoe99/aidc-barcode-toolkit&Date)

---

**Made with ❤️ by Joseph Rwanda | Origami Tech**  
*Bringing enterprise AIDC expertise to Claude Code*

---

## 🚀 Quick Links

- [Report Bug](https://github.com/rmjoe99/aidc-barcode-toolkit/issues)
- [Request Feature](https://github.com/rmjoe99/aidc-barcode-toolkit/issues)
- [View Releases](https://github.com/rmjoe99/aidc-barcode-toolkit/releases)
- [Read Documentation](https://github.com/rmjoe99/aidc-barcode-toolkit/wiki)
