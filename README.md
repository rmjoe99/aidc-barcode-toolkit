# 🏷️ AIDC Barcode Toolkit for Claude Code

Professional barcode generation, GS1 validation & thermal printing. Built by enterprise AIDC experts with 5+ years experience and 50+ client deployments.

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

- 🏭 Warehouse automation & inventory management
- 🛒 Retail & e-commerce product labeling
- 💊 Healthcare medication tracking (FDA, EU FMD compliant)
- 📦 Logistics shipping labels
- 🏭 Manufacturing asset management

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
Claude: ✅ Generated 3 Code 128 barcodes
```

## 📚 Documentation

- [Getting Started Guide](docs/getting-started.md)
- [Command Reference](docs/commands.md)
- [API Documentation](docs/api.md)
- [Use Cases](docs/use-cases/)

## 👨‍💻 About

Built by **Joseph Rwanda**, Technical Solutions Architect at Origami Tech with:
- 5+ years enterprise AIDC expertise
- 50+ client deployments (warehouse, healthcare, manufacturing)
- Honeywell Partner of the Year recognition
- Zebra RFID Product Certification
- Featured in Floriculture Magazine for innovation

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

MIT License - see [LICENSE](LICENSE)

## 📞 Contact

- **Website**: [josephrwanda.com](https://josephrwanda.com)
- **Email**: sales@origamitech.co.ke
- **LinkedIn**: [josephrwanda](https://linkedin.com/in/josephrwanda)
- **GitHub**: [rmjoe99](https://github.com/rmjoe99)

---

**Made with ❤️ by Joseph Rwanda | Origami Tech**  
*Bringing enterprise AIDC expertise to Claude Code*
