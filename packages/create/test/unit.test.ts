import test from 'tape';
import os from 'os';
import { mkdtemp, readFile, rm } from 'fs/promises';
import { join, normalize } from 'path';
import { scaffoldApp, scaffoldComponent } from './commands.js';
import { execaCommand } from 'execa';
import { pathToFileURL } from 'url';

async function getTempDir() {
  return mkdtemp(normalize(`${os.tmpdir()}/`));
}

async function getFixture(fileName: string): Promise<string> {
  return readFile(new URL(`./expected/${fileName}`, import.meta.url), 'utf-8');
}

async function getActual(path: string, { cwd }: { cwd: string}): Promise<string> {
  const BASE = pathToFileURL(join(cwd, 'package.json'));
  return readFile(new URL(path, BASE), 'utf-8');
}

test(`npm init @apollo-elements app`, async function(t) {
  const cwd = await getTempDir();
  await scaffoldApp(cwd);
  const { stdout } = await execaCommand(`tree ${cwd}`, { shell: 'sh' });
  const actual = stdout.replace(cwd, '/cwd/scaffolded-app/');
  const expect = await getFixture('AFTER_APP.txt');
  t.equal(actual, expect.trim(), 'scaffolds app files');
  await rm(cwd, { recursive: true });
  t.end();
});

test(`npm init @apollo-elements component`, async function(t) {
  const cwd = await getTempDir();

  await scaffoldApp(cwd);
  await scaffoldComponent(cwd);

  const { stdout } = await execaCommand(`tree ${cwd}`, { shell: 'sh' });
  const aTree = stdout.replace(cwd, '/cwd/scaffolded-app/');
  const eTree = await getFixture('AFTER_COMPONENT.txt');
  t.deepEqual(aTree, eTree.trim(), 'scaffolds component files');

  const actual = await getActual('./src/components/l/X.query.graphql', { cwd });
  const expect = await getFixture('X.query.graphql');
  t.equal(actual, expect, 'writes query file');
  await rm(cwd, { recursive: true });
  t.end();
});
