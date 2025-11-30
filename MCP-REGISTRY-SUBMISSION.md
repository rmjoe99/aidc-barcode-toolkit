# MCP Registry Submission Guide

This guide explains how to submit the AIDC Barcode Toolkit MCP server to various registries and integrate it with Claude/Cline.

## Quick Links

- **Manifest**: `mcp.json` (at repository root)
- **Server Implementation**: `packages/mcp/mcp-server.js`
- **npm Package**: https://www.npmjs.com/package/aidc-barcode-toolkit
- **GitHub Repository**: https://github.com/rmjoe99/aidc-barcode-toolkit

## Registry Targets

### 1. Cline MCP Registry (Recommended for Cline Users)

**Status**: Community-driven registry for Cline plugin ecosystem

**Steps**:
1. Fork https://github.com/cline/cline
2. Add entry to the MCP registry configuration (check current registry format)
3. Include:
   - Namespace: `aidc-barcode-toolkit`
   - Description: "Professional barcode/QR generation, GS1 validation & thermal printing"
   - URL: `https://raw.githubusercontent.com/rmjoe99/aidc-barcode-toolkit/main/mcp.json`
   - npm command: `npx aidc-barcode-toolkit`
4. Submit PR with title: "Add AIDC Barcode Toolkit MCP to registry"

**Link**: https://github.com/cline/cline

### 2. Claude Desktop Integration

**Status**: Anthropic's official ecosystem for Claude Desktop

**Steps**:
1. Contact: claude-tools@anthropic.com or submit via https://github.com/anthropics/claude-apps
2. Provide:
   - Manifest: `mcp.json` (attached)
   - Server command: `node packages/mcp/mcp-server.js`
   - Installation instructions
   - Support contact: josephrwanda9@gmail.com
3. For manual setup, users add to Claude Desktop config:
   ```json
   {
     "mcpServers": {
       "aidc-barcode": {
         "command": "node",
         "args": ["path/to/packages/mcp/mcp-server.js"]
       }
     }
   }
   ```

**Link**: https://github.com/anthropics/claude-apps

### 3. MCP Hub / Community Registry

**Status**: Central MCP registry for discovery

**Steps**:
1. Visit https://mcp.run
2. Submit registry entry or PR with `mcp.json`
3. Include tags: `barcode`, `qr-code`, `gs1`, `validation`, `printing`

**Link**: https://mcp.run

### 4. npm Package (Already Published ✅)

**Status**: Live and accessible

- Package: https://www.npmjs.com/package/aidc-barcode-toolkit
- Installation: `npm install aidc-barcode-toolkit`

## Configuration for Users

### Installation via npm

```bash
npm install aidc-barcode-toolkit
```

### Cline Integration

Add to Cline configuration file (e.g., `.cline/servers.json`):

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

### Claude Desktop Integration

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or equivalent on Windows/Linux:

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

After restart, Claude Desktop will have access to:
- `generate_barcode` - Generate barcodes (EAN-13, UPC-A, Code 128, Code 39, ITF-14, QR)
- `generate_qr` - Generate QR codes with configurable error correction
- `validate_gtin` - Validate GTIN check digits
- `parse_gs1` - Parse GS1 Application Identifiers
- `generate_thermal_printer` - Generate thermal printer commands

## Tools Available

### generate_barcode
Generate professional barcode images.

**Inputs**:
- `data` (required): Data to encode
- `format` (optional): EAN13, UPCA, CODE128, CODE39, ITF14, QR
- `width` (optional): Width in pixels (default: 400)
- `height` (optional): Height in pixels (default: 150)
- `output` (optional): Output file path

**Example**:
```json
{
  "data": "012345678905",
  "format": "EAN13",
  "width": 400,
  "height": 150
}
```

### generate_qr
Generate QR codes with configurable error correction.

**Inputs**:
- `data` (required): Data to encode (URL, text, etc)
- `ecc` (optional): Error correction level (L, M, Q, H)
- `size` (optional): QR code size in pixels (default: 400)
- `output` (optional): Output file path

**Example**:
```json
{
  "data": "https://github.com/rmjoe99/aidc-barcode-toolkit",
  "ecc": "H",
  "size": 400
}
```

### validate_gtin
Validate GTIN check digits.

**Inputs**:
- `code` (required): GTIN code to validate (8-14 digits)

**Example**:
```json
{
  "code": "012345678905"
}
```

### parse_gs1
Parse GS1 Application Identifiers from barcode data.

**Inputs**:
- `data` (required): GS1 formatted data string with AIs

**Example**:
```json
{
  "data": "010978013409341317250510AB123"
}
```

### generate_thermal_printer
Generate thermal printer commands (Zebra ZPL, ESC/POS, TSPL).

**Inputs**:
- `data` (required): Data to print on label
- `format` (optional): Printer command format (ZPL, ESC_POS, TSPL)
- `printerModel` (optional): Printer model (e.g., ZEBRA_GK420)

**Example**:
```json
{
  "data": "Hello, Printer!",
  "format": "ZPL",
  "printerModel": "ZEBRA_GK420"
}
```

## Support & Contact

- **Email**: josephrwanda9@gmail.com
- **GitHub Issues**: https://github.com/rmjoe99/aidc-barcode-toolkit/issues
- **License**: MIT

## Version History

- **v1.0.0** (2025-11-30): Initial release with barcode generation, QR codes, GTIN validation, GS1 parsing, and thermal printer support.
