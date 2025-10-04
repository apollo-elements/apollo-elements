import test from 'tape';
import os from 'os';
import { mkdtemp, readFile, rm, access } from 'fs/promises';
import { join, normalize } from 'path';
import { scaffoldApp, scaffoldComponent } from './commands.js';

async function getTempDir() {
  return mkdtemp(normalize(`${os.tmpdir()}/`));
}

async function getFixture(fileName: string): Promise<string> {
  return readFile(new URL(`./expected/${fileName}`, import.meta.url), 'utf-8');
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

test(`npm init @apollo-elements app`, async function(t) {
  const cwd = await getTempDir();
  await scaffoldApp(cwd);

  const expectedFiles = [
    'index.html',
    'package.json',
    'rollup.config.js',
    'src/client.schema.graphql',
    'src/client.ts',
    'src/components/app/App.query.graphql',
    'src/components/app/app.css',
    'src/components/app/app.ts',
    'src/components/app/index.ts',
    'src/components/shared.css',
    'src/declaration.d.ts',
    'src/main.ts',
    'src/router.ts',
    'style.css',
    'tsconfig.json',
    'web-dev-server.config.mjs',
  ];

  for (const file of expectedFiles) {
    const exists = await fileExists(join(cwd, file));
    t.ok(exists, `${file} exists`);
  }

  await rm(cwd, { recursive: true });
  t.end();
});

test(`npm init @apollo-elements component`, async function(t) {
  const cwd = await getTempDir();

  await scaffoldApp(cwd);
  await scaffoldComponent(cwd);

  const expectedFiles = [
    'index.html',
    'package.json',
    'rollup.config.js',
    'src/client.schema.graphql',
    'src/client.ts',
    'src/components/app/App.query.graphql',
    'src/components/app/app.css',
    'src/components/app/app.ts',
    'src/components/app/index.ts',
    'src/components/l/X.query.graphql',
    'src/components/l/index.ts',
    'src/components/l/l.css',
    'src/components/l/l.ts',
    'src/components/shared.css',
    'src/declaration.d.ts',
    'src/main.ts',
    'src/router.ts',
    'style.css',
    'tsconfig.json',
    'web-dev-server.config.mjs',
  ];

  for (const file of expectedFiles) {
    const exists = await fileExists(join(cwd, file));
    t.ok(exists, `${file} exists`);
  }

  const actual = await readFile(join(cwd, 'src/components/l/X.query.graphql'), 'utf-8');
  const expect = await getFixture('X.query.graphql');
  t.equal(actual, expect, 'writes query file');

  await rm(cwd, { recursive: true });
  t.end();
});
