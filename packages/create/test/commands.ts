import { execa } from 'execa';
import { normalize } from 'path';

const filePath = new URL(normalize('../bin/main.js'), import.meta.url).pathname;

const appFlags = [
  '--no-install',
  '--no-start',
  '--overwrite',
  '--package-defaults',
  '--uri',
  '/graphql',
  '--silent',
];

const componentFlags = [
  '--name',
  'x-l',
  '--no-edit',
  '--no-subdir',
  '--no-codegen',
  '--operation-name',
  'X',
  '--type',
  'query',
  '--fields',
  'y(input: $input) { z }',
  '--variables',
  '$input: Input',
  '--silent',
];

export async function scaffoldApp(cwd: string): Promise<void> {
  const proc = execa('node', [filePath, 'app', '--directory', cwd, ...appFlags]);
  proc.stdout?.pipe(process.stdout);
  proc.stderr?.pipe(process.stderr);
  await proc;
}

export async function scaffoldComponent(cwd: string): Promise<void> {
  const proc = execa('node', [filePath, 'component', '--directory', cwd, ...componentFlags]);
  proc.stdout?.pipe(process.stdout);
  proc.stderr?.pipe(process.stderr);
  await proc;
}
