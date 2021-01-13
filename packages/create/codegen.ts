import execa, { ExecaReturnValue } from 'execa';
import { generate } from '@graphql-codegen/cli';
import { loadConfig } from 'graphql-config';
import { BaseOptions, ComponentOptions } from './options';
import { join } from 'path';
import { getOperationFileName, getUnprefixedTagName } from './component';
import { blue, cyan, yellow, red } from 'chalk';

const cwd = process.cwd();

function getFailedFilename(options: ComponentOptions): string {
  try {
    return `src/components/${getUnprefixedTagName(options)}/${getOperationFileName(options)}`;
  } catch {
    return 'the generated operation file';
  }
}

function isComponentOptions(options: BaseOptions): options is ComponentOptions {
  // @ts-expect-error: yes it does
  const [argv1] = options._;
  return argv1 === 'component';
}
/**
 * Run GraphQL codegen to develop an initial TypeScript schema
 */
export async function codegen(options: BaseOptions): Promise<ExecaReturnValue|void> {
  if (options.skipCodegen) return;
  console.log(`\n${cyan('Generating types from schema')}...\n`);
  try {
    const filepath = join(cwd, './.graphqlrc.yml');
    const config = await loadConfig({ filepath });
    if (!config)
      throw new Error('Could not find GraphQL config');
    const { config: generateConfig, codegen } = config.projects.default.extensions;
    return await generate({
      ...generateConfig,
      generates: codegen.generates,
      cwd,
      silent: true,
    });
  } catch (error) {
    if (error.name === 'ListrError') {
      console.log(`${red('ERROR:')} Codegen did not succeed.\n`);
      error.errors.forEach((e: Error) => console.log(e.message));
    } else {
      const filename =
        isComponentOptions(options) ? blue(getFailedFilename(options)) : 'the operation definition';
      console.log(`${yellow('WARNING:')} Codegen did not succeed. Do the generated GraphQL operations match your schema?`);
      console.log(`         Check ${filename}`);
    }
  }
}
