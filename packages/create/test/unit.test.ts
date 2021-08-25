import test from 'tape';
import os from 'os';
import { mkdtemp, readFile, rmdir } from 'fs/promises';
import { globby } from 'globby';
import { join, normalize } from 'path';
import { scaffoldApp, scaffoldComponent } from './commands.js';

const EXPECTED_APP_FILES = [
  'index.html',
  'package.json',
  'rollup.config.js',
  'style.css',
  'tsconfig.json',
  'web-dev-server.config.mjs',
  'src/client.schema.graphql',
  'src/client.ts',
  'src/declaration.d.ts',
  'src/main.ts',
  'src/router.ts',
  'src/components/shared.css',
  'src/components/app/App.query.graphql',
  'src/components/app/app.css',
  'src/components/app/app.ts',
  'src/components/app/index.ts',
].map(x => normalize(x));

const EXPECTED_COMPONENT_FILES = [
  'src/components/l/X.query.graphql',
  'src/components/l/index.ts',
  'src/components/l/l.css',
  'src/components/l/l.ts',
].map(x => normalize(x));

let cwd: string;

test('setup', async function(t) {
  cwd = await mkdtemp(os.tmpdir());
  t.end();
});

test(`npm init @apollo-elements app`, async function(t) {
  t.plan(1);
  await scaffoldApp(cwd);
  const actual = await globby(join('**', '*'), { cwd });
  t.deepEqual(actual, EXPECTED_APP_FILES, 'scaffolds app files');
});

test(`npm init @apollo-elements component`, async function(t) {
  t.plan(2);

  await scaffoldComponent(cwd);

  const actual = await globby(join('**', '*'), { cwd });

  t.deepEqual(
    actual,
    EXPECTED_APP_FILES.concat(EXPECTED_COMPONENT_FILES),
    'scaffolds component files'
  );

  t.equal(
    await readFile(join(cwd, 'src', 'components', 'l', 'X.query.graphql'), 'utf-8'),
    `query X($input: Input) {
  y(input: $input) { z }
}
`, 'writes query file'
  );
});

test('teardown', async function(t) {
  await rmdir(cwd, { recursive: true });
  t.end();
});
