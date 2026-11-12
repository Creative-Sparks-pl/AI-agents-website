// Runs one Playwright suite and keeps a log of the run, so a later check can reuse a passing run.
//
// Usage: node scripts/test-run.mjs <name> [--base-url=<url>] <playwright args...>
//   e.g. node scripts/test-run.mjs unit test tests/unit --reporter=list
//   --base-url sets BASE_URL for Playwright (the config then targets that site and starts no dev server).
//
// Log: scratch/test-runs/<UTC time>-<name>.log (git-ignored; the newest sorts last)
//   line 1   <full commit hash> clean|dirty   (dirty = `git status --porcelain` lists anything)
//   line 2   the target: the base URL, or the local dev server
//   line 3   the command as run
//   then     everything Playwright printed
//   last     exit code: <n>
import { execFileSync, spawn } from 'node:child_process';
import { createWriteStream, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const LOCAL_URL = 'http://localhost:4325'; // keep in step with PORT in playwright.config.ts

const root = fileURLToPath(new URL('..', import.meta.url));
const [name, ...rest] = process.argv.slice(2);
if (!name || name.startsWith('-')) {
  console.error('usage: node scripts/test-run.mjs <name> [--base-url=<url>] <playwright args...>');
  process.exit(2);
}
const baseUrl = rest[0]?.startsWith('--base-url=') ? rest.shift().slice('--base-url='.length) : undefined;
const args = rest;

const git = (...gitArgs) => execFileSync('git', gitArgs, { cwd: root, encoding: 'utf8' }).trim();
const commit = git('rev-parse', 'HEAD');
const state = git('status', '--porcelain') === '' ? 'clean' : 'dirty';

const logDir = join(root, 'scratch', 'test-runs');
mkdirSync(logDir, { recursive: true });
const stamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
const log = createWriteStream(join(logDir, `${stamp}-${name}.log`));

const env = baseUrl ? { ...process.env, BASE_URL: baseUrl } : process.env;
const command = ['playwright', ...args].map((a) => (/\s/.test(a) ? JSON.stringify(a) : a)).join(' ');
log.write(`${commit} ${state}\n${env.BASE_URL || LOCAL_URL}\n${command}\n`);

// Run Playwright's own CLI with this Node, no shell in between, so arguments arrive exactly as given.
const cli = createRequire(import.meta.url).resolve('@playwright/test/cli');
const child = spawn(process.execPath, [cli, ...args], { cwd: root, env, stdio: ['inherit', 'pipe', 'pipe'] });
let endsWithNewline = true;
const copy = (screen) => (chunk) => {
  screen.write(chunk);
  log.write(chunk);
  endsWithNewline = chunk.at(-1) === 0x0a;
};
child.stdout.on('data', copy(process.stdout));
child.stderr.on('data', copy(process.stderr));

// Ctrl+C reaches Playwright too; wait for it to stop so its exit code still gets logged.
process.on('SIGINT', () => {});

child.on('close', (code, signal) => {
  const exitCode = code ?? 1; // killed by a signal: no code, still a failure
  log.end(`${endsWithNewline ? '' : '\n'}exit code: ${exitCode}${signal ? ` (killed by ${signal})` : ''}\n`, () => process.exit(exitCode));
});
