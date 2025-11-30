/**
 * AIDC Barcode Toolkit - MCP Server
 * Model Context Protocol integration for Cline, Claude Desktop, and other MCP clients
 * 
 * Usage:
 * npx aidc-barcode-mcp
 * 
 * In Claude settings, add:
 * {
 *   "mcpServers": {
 *     "aidc-barcode": {
 *       "command": "node",
 *       "args": ["path/to/mcp-server.js"]
 *     }
 *   }
 * }
 */

const barcode = require('../lib/index');

class AIDCBarcodeServer {
  constructor() {
    this.name = 'aidc-barcode';
    this.version = '1.0.0';
    this.tools = [
      {
        name: 'generate_barcode',
        description: 'Generate professional barcode (EAN-13, UPC-A, Code 128, Code 39, ITF-14, QR)',
        inputSchema: {
          type: 'object',
          properties: {
            data: {
              type: 'string',
              description: 'Data to encode in barcode'
            },
            format: {
              type: 'string',
              enum: ['EAN13', 'UPCA', 'CODE128', 'CODE39', 'ITF14', 'QR'],
              description: 'Barcode format'
            },
            width: {
              type: 'number',
              description: 'Barcode width in pixels (default: 400)'
            },
            height: {
              type: 'number',
              description: 'Barcode height in pixels (default: 150)'
            },
            output: {
              type: 'string',
              description: 'Output file path'
            }
          },
          required: ['data']
        }
      },
      {
        name: 'generate_qr',
        description: 'Generate QR code with configurable error correction',
        inputSchema: {
          type: 'object',
          properties: {
            data: {
              type: 'string',
              description: 'Data to encode (URL, text, etc)'
            },
            ecc: {
              type: 'string',
              enum: ['L', 'M', 'Q', 'H'],
              description: 'Error correction level (L=~7%, M=~15%, Q=~25%, H=~30%)'
            },
            size: {
              type: 'number',
              description: 'QR code size in pixels (default: 400)'
            },
            output: {
              type: 'string',
              description: 'Output file path'
            }
          },
          required: ['data']
        }
      },
      {
        name: 'validate_gtin',
        description: 'Validate GTIN check digit (EAN-8, EAN-13, UPC-A, etc)',
        inputSchema: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'GTIN code to validate (8-14 digits)'
            }
          },
          required: ['code']
        }
      },
      {
        name: 'parse_gs1',
        description: 'Parse GS1 Application Identifiers from barcode data',
        inputSchema: {
          type: 'object',
          properties: {
            data: {
              type: 'string',
              description: 'GS1 data string'
            }
          },
          required: ['data']
        }
      },
      {
        name: 'generate_thermal_printer',
        description: 'Generate thermal printer commands (Zebra ZPL, ESC/POS, TSPL)',
        inputSchema: {
          type: 'object',
          properties: {
            data: {
              type: 'string',
              description: 'Data to print'
            },
            format: {
              type: 'string',
              enum: ['ZPL', 'ESC_POS', 'TSPL'],
              description: 'Printer command format'
            },
            printerModel: {
              type: 'string',
              description: 'Printer model (e.g., ZEBRA_GK420, TSC_TTP244)'
            }
          },
          required: ['data']
        }
      }
    ];
  }

  async handleToolCall(toolName, params) {
    try {
      switch (toolName) {
        case 'generate_barcode':
          return await barcode.generateBarcode(params.data, {
            format: params.format,
            width: params.width,
            height: params.height,
            output: params.output
          });

        case 'generate_qr':
          return await barcode.generateQRCode(params.data, {
            ecc: params.ecc,
            size: params.size,
            output: params.output
          });

        case 'validate_gtin':
          return barcode.validateGTIN(params.code);

        case 'parse_gs1':
          return barcode.parseGS1(params.data);

        case 'generate_thermal_printer':
          return barcode.generateThermalPrinter(params.data, {
            format: params.format,
            printerModel: params.printerModel
          });

        default:
          return { error: `Unknown tool: ${toolName}` };
      }
    } catch (error) {
      return {
        error: error.message,
        details: error.toString()
      };
    }
  }

  getToolsList() {
    return this.tools;
  }

  async initialize() {
    console.log(`✅ AIDC Barcode Toolkit MCP Server v${this.version} started`);
    console.log(`📍 Available tools: ${this.tools.map(t => t.name).join(', ')}`);
    return {
      name: this.name,
      version: this.version,
      tools: this.tools
    };
  }
}

// Export for use as MCP server
module.exports = AIDCBarcodeServer;

// Run as standalone server if executed directly
if (require.main === module) {
  const server = new AIDCBarcodeServer();
  server.initialize();

  // Simple stdio-based protocol handler
  process.stdin.on('data', async (data) => {
    try {
      const request = JSON.parse(data.toString());
      const response = await server.handleToolCall(
        request.tool,
        request.params
      );
      process.stdout.write(JSON.stringify(response) + '\n');
    } catch (error) {
      process.stdout.write(
        JSON.stringify({ error: error.message }) + '\n'
      );
    }
  });
}
