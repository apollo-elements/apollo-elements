import execa, { ExecaReturnValue } from 'execa';
import { BaseOptions } from '.';

const cwd = process.cwd();

/**
 * Run GraphQL codegen to develop an initial TypeScript schema
 */
export async function codegen(options: BaseOptions): Promise<ExecaReturnValue> {
  console.log('\nGenerating TypeScript Schema...\n');
  return await execa(
    options.pkgManager,
    [...(options.pkgManager === 'npm' ? ['run'] : []), 'build:codegen'],
    { cwd, stdio: 'inherit' }
  );
}
