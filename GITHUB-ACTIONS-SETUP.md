# GitHub Actions CI/CD Setup Guide

This document provides step-by-step instructions to configure GitHub repository secrets and enable automated multi-platform publishing.

## Overview

The enhanced `.github/workflows/publish.yml` workflow automatically publishes to npm, Open VSX, and generates release assets when you create a GitHub release. To enable this, you need to configure three repository secrets.

## Step 1: Navigate to Repository Settings

1. Go to your repository: https://github.com/rmjoe99/aidc-barcode-toolkit
2. Click **Settings** (top navigation bar)
3. In the left sidebar, select **Secrets and variables** → **Actions**

## Step 2: Add NPM_TOKEN

**What it is**: Authentication token for publishing to npm registry.

**How to get it**:
1. Log in to https://www.npmjs.com
2. Click your profile icon (top right) → **Access Tokens**
3. Click **Generate New Token** → Select **Classic Token**
4. Give it a name (e.g., "GitHub Actions CI")
5. Select scope: **Publish**
6. Click **Generate** and copy the token

**Add to GitHub**:
1. Click **New repository secret** (green button)
2. **Name**: `NPM_TOKEN`
3. **Secret**: Paste the npm token
4. Click **Add secret**

## Step 3: Add OPENVSX_TOKEN

**What it is**: Authentication token for publishing to Open VSX marketplace.

**Status**: You already provided this token during previous setup:
```
ovsxp_a9bef166-3e29-4a73-84eb-4790200cb268
```

**Add to GitHub**:
1. Click **New repository secret**
2. **Name**: `OPENVSX_TOKEN`
3. **Secret**: `ovsxp_a9bef166-3e29-4a73-84eb-4790200cb268`
4. Click **Add secret**

## Step 4: Add VSCE_PAT (Optional - Visual Studio Marketplace)

**What it is**: Authentication token for publishing to Visual Studio Marketplace.

**Status**: ⚠️ Currently blocked due to inactive Azure DevOps tenant. You can add this later once tenant is reactivated or skip for now (workflow has `continue-on-error: true`).

**How to get it** (when ready):
1. Go to https://dev.azure.com/
2. Sign in with your Microsoft account
3. Create Personal Access Token (PAT):
   - User Settings → Personal Access Tokens
   - New Token
   - Name: "VSCE Publishing"
   - Scopes: "Marketplace (manage)"
   - Create

**Add to GitHub** (when ready):
1. Click **New repository secret**
2. **Name**: `VSCE_PAT`
3. **Secret**: Paste the Azure PAT
4. Click **Add secret**

## Verification

After adding secrets, verify in **Settings → Secrets and variables → Actions**:

```
✓ NPM_TOKEN
✓ OPENVSX_TOKEN
- VSCE_PAT (optional, skip if Azure issue unresolved)
```

## Testing the Workflow

Once secrets are configured, test the CI/CD pipeline:

### Option 1: Create a Test Release

```bash
# Create a test tag (e.g., v1.0.1-rc.1)
git tag -a v1.0.1-rc.1 -m "Test CI/CD workflow"
git push origin v1.0.1-rc.1
```

Then:
1. Go to **Releases** on GitHub
2. Create Release from this tag
3. Click "Publish release"
4. Go to **Actions** to monitor workflow execution

### Option 2: Trigger Manually

1. Go to your repo → **Actions**
2. Select "Publish" workflow
3. Click "Run workflow" (if manual trigger is enabled)

### Option 3: Create a Dry-Run Release

1. Go to **Releases** → "Draft a new release"
2. Tag: `v1.0.1-test`
3. Title: "Test Release - CI/CD Testing"
4. Description: "This is a test release to verify CI/CD automation"
5. Check "Set as a pre-release"
6. Click "Publish release"

The workflow will execute; since it's marked as pre-release, most package managers won't feature it.

## Monitoring Workflow Execution

Once a release is published:

1. Go to **Actions** tab
2. View the "Publish" workflow run
3. Each job will execute in sequence/parallel:
   - `publish-npm`: Publishes to npm registry
   - `publish-vscode`: Publishes to VS Code Marketplace (may fail if Azure issue unresolved)
   - `publish-openvsx`: Publishes to Open VSX
   - `create-release-assets`: Packages VSIX and creates source archive
   - `mcp-registry-notification`: Verifies MCP manifest
   - `publish-summary`: Displays comprehensive summary

4. Click each job to view detailed logs

## Workflow Behavior

### On Success
- ✅ npm package published with new version
- ✅ VSIX packaged and attached to release
- ✅ Open VSX updated with new version
- ✅ Release assets (VSIX + source ZIP) uploaded to GitHub release
- ✅ Summary posted to workflow logs

### On Partial Failure (Expected Cases)
- ⚠️ VS Code Marketplace job fails → continues (Azure issue)
- ✅ All other jobs complete successfully

### On Error
- Check job logs in **Actions** tab
- Common issues:
  - Expired or invalid token: regenerate and update secret
  - Network timeout: retry workflow execution
  - Version conflict (npm): bump version in `package.json`

## Future Release Process

Once CI/CD is configured, publishing to all platforms is simplified:

```bash
# 1. Bump version in package.json (e.g., 1.0.1 → 1.0.2)
# 2. Commit changes
git add package.json packages/vscode/package.json
git commit -m "Bump version to 1.0.2"

# 3. Create and push version tag
git tag -a v1.0.2 -m "Release v1.0.2"
git push origin main --follow-tags

# 4. Create GitHub release
# Go to GitHub → Releases → Draft a new release
# Select tag v1.0.2 → Generate release notes → Publish
```

The workflow will automatically handle the rest!

## Troubleshooting

### Issue: Workflow does not trigger on release

**Cause**: Workflow not configured to trigger on release events.

**Solution**: The updated `.github/workflows/publish.yml` includes:
```yaml
on:
  release:
    types: [published]
```

This is correctly set. If workflow still doesn't trigger:
1. Go to **Settings → Actions** and verify permissions
2. Ensure workflow file is on main branch (`git push origin main`)

### Issue: npm Publish Fails (403 Unauthorized)

**Cause**: NPM_TOKEN invalid or expired.

**Solution**:
1. Go to https://www.npmjs.com → Access Tokens
2. Regenerate or create new token
3. Update `NPM_TOKEN` secret in GitHub

### Issue: Open VSX Publish Fails

**Cause**: OPENVSX_TOKEN invalid or namespace issue.

**Solution**:
1. Verify token at https://open-vsx.org/user/settings/tokens
2. If namespace issue, run locally: `npx ovsx create-namespace <namespace>`
3. Update `OPENVSX_TOKEN` secret if regenerated

## Advanced: Manual Publish (Fallback)

If CI/CD fails, you can publish manually:

```bash
# npm
npm publish

# Open VSX
npx ovsx publish aidc-barcode-toolkit-*.vsix

# VS Code Marketplace (requires vsce and PAT)
npx vsce publish -p <VSCE_PAT>
```

## Questions?

- **Email**: josephrwanda9@gmail.com
- **GitHub Issues**: https://github.com/rmjoe99/aidc-barcode-toolkit/issues
- **Workflow Logs**: https://github.com/rmjoe99/aidc-barcode-toolkit/actions
