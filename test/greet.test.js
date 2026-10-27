import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

test('greet is an ESM named export', async () => {
  const { greet } = await import('../src/greet.js');
  assert.strictEqual(typeof greet, 'function');
});

test('greet("Ada") returns "Hello, Ada!"', async () => {
  const { greet } = await import('../src/greet.js');
  assert.strictEqual(greet('Ada'), 'Hello, Ada!');
});

test('greet writes nothing to stdout or stderr', () => {
  const result = spawnSync(
    process.execPath,
    ['--input-type=module', '-e', "import { greet } from './src/greet.js'; greet('Ada');"],
    { cwd: root, encoding: 'utf8' },
  );
  assert.strictEqual(result.status, 0);
  assert.strictEqual(result.stdout, '');
  assert.strictEqual(result.stderr, '');
});
