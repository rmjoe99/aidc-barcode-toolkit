#!/usr/bin/env node

/**
 * AIDC Barcode Toolkit - Multi-Platform Distribution Script
 * Automates publishing to npm, VS Code, Open VSX, and more
 * 
 * Usage: node distribute.js [--dry-run] [--npm] [--vscode] [--openvsx] [--all]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m'
};

class DistributionManager {
  constructor() {
    this.dryRun = process.argv.includes('--dry-run');
    this.platforms = {
      npm: process.argv.includes('--npm') || process.argv.includes('--all'),
      vscode: process.argv.includes('--vscode') || process.argv.includes('--all'),
      openvsx: process.argv.includes('--openvsx') || process.argv.includes('--all')
    };

    // Default to all if no specific platform specified
    if (!this.platforms.npm && !this.platforms.vscode && !this.platforms.openvsx) {
      this.platforms = { npm: true, vscode: true, openvsx: true };
    }

    this.results = {};
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  async run() {
    this.log('\n🚀 AIDC Barcode Toolkit - Multi-Platform Distribution\n', 'bright');

    if (this.dryRun) {
      this.log('DRY RUN MODE - No actual publishing\n', 'yellow');
    }

    // Check prerequisites
    await this.checkPrerequisites();

    // Publish to each platform
    if (this.platforms.npm) await this.publishNpm();
    if (this.platforms.vscode) await this.publishVSCode();
    if (this.platforms.openvsx) await this.publishOpenVSX();

    // Summary
    this.printSummary();
  }

  async checkPrerequisites() {
    this.log('📋 Checking prerequisites...', 'blue');

    try {
      // Check npm login
      execSync('npm whoami', { stdio: 'pipe' });
      this.log('✅ npm: Logged in', 'green');
    } catch {
      this.log('❌ npm: Not logged in (run: npm login)', 'red');
    }

    // Check vsce installed
    try {
      execSync('vsce --version', { stdio: 'pipe' });
      this.log('✅ vsce: Installed', 'green');
    } catch {
      this.log('⚠️  vsce: Not installed (run: npm install -g vsce)', 'yellow');
    }

    // Check ovsx installed
    try {
      execSync('ovsx --version', { stdio: 'pipe' });
      this.log('✅ ovsx: Installed', 'green');
    } catch {
      this.log('⚠️  ovsx: Not installed (run: npm install -g ovsx)', 'yellow');
    }

    this.log('');
  }

  async publishNpm() {
    this.log('📦 Publishing to npm...', 'blue');

    try {
      if (!this.dryRun) {
        execSync('npm publish', { cwd: process.cwd() });
      }
      this.log('✅ npm: Published successfully', 'green');
      this.results.npm = 'success';
    } catch (error) {
      this.log(`❌ npm: ${error.message}`, 'red');
      this.results.npm = 'failed';
    }
  }

  async publishVSCode() {
    this.log('🎨 Publishing to VS Code Marketplace...', 'blue');

    try {
      if (!this.dryRun) {
        execSync('vsce publish', {
          cwd: path.join(process.cwd(), 'packages/vscode')
        });
      }
      this.log('✅ VS Code: Published successfully', 'green');
      this.results.vscode = 'success';
    } catch (error) {
      this.log(`❌ VS Code: ${error.message}`, 'red');
      this.results.vscode = 'failed';
    }
  }

  async publishOpenVSX() {
    this.log('🌐 Publishing to Open VSX Registry...', 'blue');

    try {
      if (!this.dryRun) {
        execSync('ovsx publish', {
          cwd: path.join(process.cwd(), 'packages/vscode')
        });
      }
      this.log('✅ Open VSX: Published successfully', 'green');
      this.results.openvsx = 'success';
    } catch (error) {
      this.log(`❌ Open VSX: ${error.message}`, 'red');
      this.results.openvsx = 'failed';
    }
  }

  printSummary() {
    this.log('\n📊 Distribution Summary', 'bright');
    this.log('='.repeat(50));

    const results = this.results;
    const successful = Object.values(results).filter(r => r === 'success').length;
    const failed = Object.values(results).filter(r => r === 'failed').length;

    if (results.npm) {
      const status = results.npm === 'success' ? '✅' : '❌';
      this.log(`${status} npm Registry`, results.npm === 'success' ? 'green' : 'red');
    }

    if (results.vscode) {
      const status = results.vscode === 'success' ? '✅' : '❌';
      this.log(`${status} VS Code Marketplace`, results.vscode === 'success' ? 'green' : 'red');
    }

    if (results.openvsx) {
      const status = results.openvsx === 'success' ? '✅' : '❌';
      this.log(`${status} Open VSX Registry`, results.openvsx === 'success' ? 'green' : 'red');
    }

    this.log('\n' + '='.repeat(50));
    this.log(`Successful: ${successful}/${Object.keys(results).length}`, 'green');
    if (failed > 0) {
      this.log(`Failed: ${failed}/${Object.keys(results).length}`, 'red');
    }

    this.log('\n🎯 Next Steps:', 'bright');
    this.log('1. Verify packages published:');
    this.log('   - npm: https://www.npmjs.com/package/aidc-barcode-toolkit');
    this.log('   - VS Code: Search "aidc barcode" in VS Code Extensions');
    this.log('   - Open VSX: https://open-vsx.org/extension/josephrwanda/aidc-barcode-toolkit');
    this.log('\n2. Post on social media about the release');
    this.log('3. Email users about availability on new platforms\n');
  }
}

// Run distribution
const manager = new DistributionManager();
manager.run().catch(error => {
  console.error('Distribution failed:', error);
  process.exit(1);
});
