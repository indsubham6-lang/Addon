#!/usr/bin/env bun

/*
 * ============================================================
 * Linkumori
 * ============================================================
 * Copyright (c) 2026 Subham Mahesh
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation, either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this program. If not, see
 * <http://www.gnu.org/licenses/>.
 *
 * ============================================================
 * MODIFICATION HISTORY
 * ============================================================
 * 2026-03-31  Subham Mahesh   First modification
 *
 * Note: Due to inline constraints, subsequent modifications may
 * not appear here. To view the full history, run:
 *
 *   node linkumori-cli-tool.js
 *
 * Select "Generate Commit History" to produce a Markdown file
 * listing all modifications by file, author, and date.
 *
 * IMPORTANT NOTES
 * ---------------
 * - git clone is required before running "Generate Commit History";
 *   otherwise commit history generation will not work.
 * - Older modifications may not appear in the generated
 *   COMMIT_HISTORY.md.
 * - If a file's inline notice is limited, check for a separate
 *   file-specific notice and COMMIT_HISTORY.md; if neither exists,
 *   treat the inline notice as the final modification record.
 * - If a separate file-specific notice is provided, check the
 *   file's inline notice and COMMIT_HISTORY.md; if neither exists,
 *   treat the separate notice as the final modification record.
 * - Review individual modified source files for earlier notices.
 * - Some files may not contain notices within the file itself or
 *   may not be listed in COMMIT_HISTORY.md; a separate notice
 *   file may be provided instead.
 * - Not all source files have been modified, but review notices
 *   in all source files and any separate notice files (.md or .txt).
 * ============================================================
 */

import { readFileSync } from "fs";
import { execSync } from "child_process";
import { glob } from "glob";

const version = JSON.parse(readFileSync("manifest.json", "utf8")).version;

const artifacts = await glob("web-ext-artifacts/*.xpi");

if (artifacts.length === 0) {
  console.error("ERROR: No .xpi artifact found in web-ext-artifacts/");
  process.exit(1);
}

const artifact = artifacts[0];
console.log(`Uploading ${artifact} (v${version}) to AMO...`);

execSync(
  `web-ext sign \
    --source-dir . \
    --artifacts-dir web-ext-artifacts \
    --channel ${process.env.WEB_EXT_CHANNEL} \
    --api-key ${process.env.WEB_EXT_API_KEY} \
    --api-secret ${process.env.WEB_EXT_API_SECRET} \
    --use-submission-api \
    --upload-source-code ${artifact}`,
  { stdio: "inherit" }
);
