import type { BaseOptions, AppOptions, ComponentOptions } from './options';

import { app } from './app.js';
import { component } from './component.js';

import prompts from 'prompts';

import BANNER from './banner.js';

import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Yargs: typeof import('yargs') = require('yargs');

export type PromptOptions<T> =
  Partial<T> & BaseOptions;

const ERR_BAD_CE_TAG_NAME =
  'Custom element tag names must contain a hyphen (-)';

export async function promptApp(options: PromptOptions<AppOptions>): Promise<AppOptions> {
  return {
    ...options,
    ...await prompts([{
      type: () => options?.uri == null ? 'text' : null,
      name: 'uri',
      message: 'What is the URI to your GraphQL endpoint?',
      initial: options?.uri ?? '/graphql',
    }, {
      type: () => options?.yes == null ? 'confirm' : null,
      name: 'yes',
      message: 'Use default package.json fields (e.g. author, license, etc)',
      initial: options?.yes ?? true,
    }, {
      type: () => options?.install == null ? 'confirm' : null,
      name: 'install',
      message: 'Install dependencies?',
      initial: true,
    }, {
      type: () => options?.start == null ? 'confirm' : null,
      name: 'start',
      message: 'Launch when ready?',
      initial: true,
    }]),
  };
}

export async function promptComponent(
  options?: PromptOptions<ComponentOptions>
): Promise<ComponentOptions> {
  return {
    ...options,
    ...await prompts([{
      type: () => options?.type == null ? 'select' : null,
      name: 'type',
      message: 'What kind of component is it?',
      initial: 0,
      choices: [
        { title: 'Query', value: 'query' },
        { title: 'Mutation', value: 'mutation' },
        { title: 'Subscription', value: 'subscription' },
      ],
    }, {
      type: () => options?.name == null ? 'text' : null,
      name: 'name',
      message: 'What is the component\'s tag name?',
      initial: options?.name ?? '',
      validate: name => name.includes('-') || ERR_BAD_CE_TAG_NAME,
    }, {
      type: () => options?.subdir == null ? 'text' : null,
      name: 'subdir',
      initial: options?.subdir ?? '',
      message: 'Sub directory. Leave blank to scaffold to src/components',
    }]),
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
    .option('skipCodegen', {
      type: 'boolean',
      default: false,
      demandOption: false,
      description: 'Skip the codegen phase',
    })
    .command<AppOptions>('app', 'Generate an Apollo Elements Skeleton App', yargs => void yargs
      .option('uri', {
        alias: 'u',
        type: 'string',
        description: 'URI to your GraphQL endpoint',
      })
      .option('yes', {
        alias: 'y',
        type: 'boolean',
        description: 'Use default package.json fields (e.g. author, license)',
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
      .option('operationName', {
        alias: 'o',
        type: 'string',
        description: 'GraphQL Operation name',
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
        default: 'query',
      })
      .option('yes', {
        type: 'boolean',
        alias: 'y',
        default: false,
        description: 'Overwrite files without prompting',
      })
      .option('fields', {
        type: 'string',
        default: null,
        demandOption: false,
        description: 'Optional custom fields e.g. `id name picture { alt url }`',
      })
      .option('variables', {
        type: 'string',
        default: null,
        demandOption: false,
        description: 'Optional custom variables e.g. `input: $UpdateUserInput`',
      })
      .option('sharedCssPath', {
        type: 'string',
        default: null,
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

      const { generate } = await prompts({
        name: 'generate',
        message: 'What would you like to generate?',
        type: 'select',
        choices: [{
          title: 'App',
          value: 'app',
          description: 'Scaffold an app project',
        }, {
          title: 'Component',
          value: 'component',
          description: 'Scaffold a component for an existing app',
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
    if (error.command.includes('build:codegen'))
      return;
    else
      console.error(error);
  }
}
