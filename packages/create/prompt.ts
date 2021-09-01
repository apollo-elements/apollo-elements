import type { BaseOptions, AppOptions, ComponentOptions } from './options';

import { app } from './app.js';
import { component } from './component.js';

import inquirer from 'inquirer';

import BANNER from './banner.js';

import m from 'module';

const require = m.createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Yargs: typeof import('yargs') = require('yargs');

export type PromptOptions<T> =
  Partial<T> & BaseOptions;

const ERR_BAD_CE_TAG_NAME =
  'Custom element tag names must contain a hyphen (-)';

export async function promptApp(options: PromptOptions<AppOptions>): Promise<AppOptions> {
  return {
    ...options,
    ...await inquirer.prompt([{
      type: 'input',
      name: 'uri',
      message: 'What is the URI to your GraphQL endpoint?',
      default: '/graphql',
    }, {
      type: 'confirm',
      name: 'overwrite',
      message: 'Overwrite existing files?',
      default: false,
    }, {
      type: 'confirm',
      name: 'package-defaults',
      message: 'Use default package.json fields (e.g. author, license, etc)?',
      default: true,
    }, {
      type: 'confirm',
      name: 'install',
      message: 'Install dependencies?',
      default: true,
    }, {
      type: 'confirm',
      name: 'start',
      message: 'Launch when ready?',
      default: true,
    }], options),
  };
}

export async function promptComponent(
  options?: PromptOptions<ComponentOptions>
): Promise<ComponentOptions> {
  return {
    ...options,
    ...await inquirer.prompt([{
      type: 'list',
      name: 'type',
      message: 'What kind of component is it?',
      choices: [
        { name: 'Query', value: 'query' },
        { name: 'Mutation', value: 'mutation' },
        { name: 'Subscription', value: 'subscription' },
      ],
    }, {
      type: 'input',
      name: 'name',
      message: 'What is the component\'s tag name?',
      validate: name => name.includes('-') || ERR_BAD_CE_TAG_NAME,
    }, {
      type: 'input',
      name: 'subdir',
      message: 'Sub directory. Leave blank to scaffold to src/components',
    }, {
      when: () => !options?.operationName && options?.edit === true,
      name: 'operationName',
      message: 'Enter your operation name e.g. AllItems',
    }, {
      type: 'editor',
      name: 'operation',
      message: 'Enter your GraphQL operation.',
      when: () => options?.edit,
    }], { ...options, subdir: options && options.subdir || '' }),
  } as ComponentOptions;
}

export async function prompt(): Promise<void> {
  const pkgManager: 'npm'|'yarn' =
      process.argv0 === 'npm' ? process.argv0
    : process.argv0 === 'yarn' ? process.argv0
    : 'npm';

  const { argv } = Yargs
    .scriptName(`${pkgManager ?? 'npm'} init @apollo-elements`)
    .usage('$0 [<cmd>] [args]')
    .option('pkgManager', {
      type: 'string',
      default: pkgManager,
      description: 'Preferred package manager',
    })
    .option('schemaPath', {
      type: 'string',
      default: null,
      demandOption: false,
      description: `Optional schema path for imports. Use to import from a package or specific file.`,
    })
    .option('codegen', {
      type: 'boolean',
      default: true,
      description: 'Run codegen after scaffolding files',
    })
    .option('silent', {
      type: 'boolean',
      default: false,
      description: 'Do not log anything to stdout',
    })
    .option('directory', {
      type: 'string',
      default: process.cwd(),
      demandOption: false,
      description: 'Output directory',
    })
    .command<AppOptions>('app', 'Generate an Apollo Elements Skeleton App', yargs => void yargs
      .option('uri', {
        alias: 'u',
        type: 'string',
        description: 'URI to your GraphQL endpoint',
      })
      .option('package-defaults', {
        type: 'boolean',
        description: 'Use default package.json fields (e.g. author, license)',
      })
      .option('overwrite', {
        type: 'boolean',
        description: 'Overwrite existing files',
      })
      .option('install', {
        alias: 'i',
        type: 'boolean',
        description: 'Automatically install dependencies',
      })
      .option('start', {
        alias: 's',
        type: 'boolean',
        description: 'Launch the dev server after scaffolding',
      })
      .help())
    .command<ComponentOptions>('component', 'Generate an Apollo Element', yargs => void yargs
      .option('name', {
        alias: 'n',
        type: 'string',
        description: 'Custom element tag name',
      })
      .option('subdir', {
        alias: 'd',
        type: 'string',
        description: 'Optional subdir under src/components',
      })
      .option('type', {
        alias: 't',
        type: 'string',
        choices: ['query', 'mutation', 'subscription'],
        description: 'Element Type',
      })
      .option('overwrite', {
        type: 'boolean',
        default: false,
        description: 'Overwrite files without prompting',
      })
      .option('edit', {
        type: 'boolean',
        default: true,
        description: 'Open the default editor to define the operation',
      })
      .option('operationName', {
        alias: 'o',
        type: 'string',
        description: 'GraphQL Operation name',
      })
      .option('fields', {
        type: 'string',
        demandOption: false,
        description: 'Optional custom fields e.g. `id name picture { alt url }`',
        implies: ['operationName'],
      })
      .option('variables', {
        type: 'string',
        demandOption: false,
        description: 'Optional custom variables e.g. `input: $UpdateUserInput`',
        implies: ['operationName', 'fields'],
      })
      .option('sharedCssPath', {
        type: 'string',
        demandOption: false,
        description: `Optional path for shared CSS file. Use empty string '' to disable`,
      })
      .help())
    .help()
    .check(({ name }) => {
      if (typeof name === 'string' && !name.includes('-'))
        throw new Error(ERR_BAD_CE_TAG_NAME);
      else
        return true;
    });

  try {
    if (argv._.includes('app'))
      return await promptApp(argv).then(app);
    else if (argv._.includes('component'))
      return await promptComponent(argv).then(component);
    else {
      console.log(BANNER);

      const { generate } = await inquirer.prompt({
        name: 'generate',
        message: 'What would you like to generate?',
        type: 'list',
        choices: [{
          name: 'App',
          value: 'app',
          short: 'Scaffold an app project',
        }, {
          name: 'Component',
          value: 'component',
          short: 'Scaffold a component for an existing app',
        }],
      });

      const commandAppendedArgv: typeof argv = {
        ...argv,
        _: [generate, ...argv._ ?? []],
      };

      switch (generate) {
        case 'app':
          return await promptApp(commandAppendedArgv)
            .then(app);
        case 'component':
          return await promptComponent(commandAppendedArgv)
            .then(component);
      }
    }
  } catch (error) {
    if (error?.command?.includes?.('build:codegen'))
      return;
    else
      console.error(error);
  }
}
