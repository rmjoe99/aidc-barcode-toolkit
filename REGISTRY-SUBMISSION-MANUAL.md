# MCP Registry Submission - Step by Step Guide

This document provides detailed instructions for manually submitting your MCP manifest to all major registries.

---

## 1. Cline MCP Registry Submission

**Repository**: https://github.com/cline/cline

### Steps:

1. **Fork the repository**
   - Go to https://github.com/cline/cline
   - Click "Fork" (top right)
   - This creates your own copy

2. **Find the registry file**
   - Look for a file like `mcp-registry.json` or `.mcp/registry.json`
   - Common locations:
     - `/mcp-registry.json`
     - `/.mcp/servers.json`
     - Check the repo's README for registry location

3. **Add your entry**
   - Your entry should look like:
   ```json
   {
     "name": "aidc-barcode-toolkit",
     "displayName": "AIDC Barcode Toolkit",
     "description": "Professional barcode/QR code generation, GS1 validation, and thermal printer support",
     "version": "1.0.0",
     "author": "Joseph Rwanda",
     "repository": "https://github.com/rmjoe99/aidc-barcode-toolkit",
     "npmPackage": "aidc-barcode-toolkit",
     "command": "npx",
     "args": ["aidc-barcode-toolkit"],
     "homepage": "https://github.com/rmjoe99/aidc-barcode-toolkit",
     "license": "MIT",
     "tools": [
       "generate_barcode",
       "generate_qr",
       "validate_gtin",
       "parse_gs1",
       "generate_thermal_printer"
     ]
   }
   ```

4. **Create a Pull Request**
   - Go to your forked repo
   - Click "Contribute" → "Open a pull request"
   - Title: `Add AIDC Barcode Toolkit to MCP registry`
   - Description:
     ```
     ## Description
     Adding AIDC Barcode Toolkit to the Cline MCP registry.

     ## Package Details
     - Name: aidc-barcode-toolkit
     - Version: 1.0.0
     - npm: https://www.npmjs.com/package/aidc-barcode-toolkit
     - Repository: https://github.com/rmjoe99/aidc-barcode-toolkit

     ## Features
     - Generate barcodes (EAN-13, UPC-A, Code 128/39, ITF-14)
     - Generate QR codes with error correction
     - Validate GTIN check digits
     - Parse GS1 Application Identifiers
     - Generate thermal printer commands

     ## MCP Manifest
     Available at: https://github.com/rmjoe99/aidc-barcode-toolkit/blob/main/mcp.json
     ```

5. **Wait for approval**
   - Cline maintainers will review your PR
   - Typically approved within 1-7 days
   - You'll receive a notification when merged

---

## 2. Claude Desktop Submission

**Contact**: claude-tools@anthropic.com

### Email Template:

```
Subject: MCP Server Submission - AIDC Barcode Toolkit

Dear Anthropic Team,

I would like to submit the AIDC Barcode Toolkit for inclusion in Claude's
MCP ecosystem.

PROJECT DETAILS:
- Name: AIDC Barcode Toolkit
- Version: 1.0.0
- Repository: https://github.com/rmjoe99/aidc-barcode-toolkit
- npm Package: https://www.npmjs.com/package/aidc-barcode-toolkit
- License: MIT

FEATURES:
The toolkit provides 5 production-ready tools accessible via MCP:
1. generate_barcode - Generate barcodes (EAN-13, UPC-A, Code 128/39, ITF-14)
2. generate_qr - Generate QR codes with error correction
3. validate_gtin - Validate GTIN/EAN check digits
4. parse_gs1 - Parse GS1 Application Identifiers
5. generate_thermal_printer - Generate thermal printer commands (ZPL/ESC-POS/TSPL)

INSTALLATION:
Users can add the following to their claude_desktop_config.json:
{
  "mcpServers": {
    "aidc-barcode": {
      "command": "npx",
      "args": ["aidc-barcode-toolkit"]
    }
  }
}

MCP MANIFEST:
https://raw.githubusercontent.com/rmjoe99/aidc-barcode-toolkit/main/mcp.json

COMPLIANCE:
- All commits include DCO sign-offs
- Licensed under MIT
- No security vulnerabilities (npm audit clean)
- Full TypeScript definitions included

Thank you for considering this submission. Please let me know if you need
any additional information.

Best regards,
Joseph Rwanda
josephrwanda9@gmail.com
```

### How to Send:

1. Open your email client
2. Send to: claude-tools@anthropic.com
3. Copy-paste the template above
4. Wait for response (typically 3-14 days)

---

## 3. MCP Hub (Community Registry)

**Website**: https://mcp.run

### Steps:

1. **Visit the website**
   - Go to https://mcp.run
   - Look for "Submit" or "Add Server" button

2. **Fill out the form with:**
   - **Name**: AIDC Barcode Toolkit
   - **Repository**: https://github.com/rmjoe99/aidc-barcode-toolkit
   - **npm Package**: aidc-barcode-toolkit
   - **Description**: Professional barcode/QR code generation, GS1 validation, and thermal printer support
   - **Tags**: barcode, qr-code, gs1, validation, printing, mcp, nodejs
   - **Homepage**: https://github.com/rmjoe99/aidc-barcode-toolkit
   - **License**: MIT
   - **Author**: Joseph Rwanda

3. **Submit**
   - Click "Submit" or "Register"
   - May require email verification
   - Should be live within 1-2 days

---

## 4. Alternative Registries

### OpenRouter / LLM Registries
- Some AI model registries accept MCP servers
- Check https://openrouter.com for submission process
- Not critical but increases visibility

### GitHub Marketplace (Alternative)
- GitHub has a Visual Studio Marketplace
- Can list your extension separately
- Requires separate registration

---

## Tracking Your Submissions

Use this table to track status:

| Registry | Status | URL | Notes |
|----------|--------|-----|-------|
| Cline MCP | ⏳ Pending | https://github.com/cline/cline | PR link: ___ |
| Claude Desktop | ⏳ Pending | Email sent to claude-tools@anthropic.com | Date: ___ |
| MCP Hub | ⏳ Pending | https://mcp.run | Date: ___ |

---

## What Happens After Submission

### Once Approved:

1. **Cline Registry**
   - Your MCP appears in Cline's server discovery
   - Users can install with one click
   - Included in Cline's default recommendations

2. **Claude Desktop**
   - Featured in Claude's MCP directory
   - Users can add via documented integration
   - Potential for featured placement

3. **MCP Hub**
   - Listed on https://mcp.run
   - Community can rate and review
   - Increases discoverability

### User Experience:

Once registered, users will be able to:
```bash
# 1. Install globally
npm install -g aidc-barcode-toolkit

# 2. Configure in Claude Desktop
# Edit ~/.config/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "aidc-barcode": {
      "command": "npx",
      "args": ["aidc-barcode-toolkit"]
    }
  }
}

# 3. Use in Claude
# "Generate a barcode for product 012345678905"
# Claude automatically uses your MCP!
```

---

## Timeline Expectations

| Registry | Expected Response | Status Update |
|----------|-------------------|----------------|
| Cline MCP | 1-7 days | PR comments |
| Claude Desktop | 3-14 days | Email response |
| MCP Hub | 1-2 days | Automatic confirmation |

---

## Support & Contact

If you encounter issues:

1. **Cline MCP**
   - GitHub Issues: https://github.com/cline/cline/issues
   - Discussions: https://github.com/cline/cline/discussions

2. **Claude Desktop**
   - Email: claude-tools@anthropic.com
   - Check: https://github.com/anthropics/claude-apps

3. **MCP Hub**
   - Website: https://mcp.run
   - Contact form on website

4. **General MCP Support**
   - MCP Specification: https://spec.modelcontextprotocol.io
   - Community: Discuss on GitHub

---

## Next Steps After All Submissions

Once all registries approve:

1. **Update your README** with registry links
2. **Create announcement** on social media
3. **Monitor metrics**:
   - Downloads on npm
   - Reviews on Cline registry
   - Star count on GitHub
   - Usage in Claude Desktop

4. **Plan v1.1.0 release** with additional features

---

## Questions?

- Email: josephrwanda9@gmail.com
- GitHub Issues: https://github.com/rmjoe99/aidc-barcode-toolkit/issues
- MCP Spec: https://spec.modelcontextprotocol.io
