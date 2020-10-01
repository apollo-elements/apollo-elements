#!/usr/bin/env node

import { app } from './app';
import { component } from './component';

import prompts from 'prompts';

import BANNER from './banner';

import Yargs from 'yargs';

type PromptOptions<T> = Partial<T> & BaseOptions;

export interface BaseOptions {
  pkgManager: 'npm' | 'yarn';
}

export interface AppOptions extends BaseOptions {
  yes: boolean;
  install: boolean;
  start: boolean;
  uri: string;
}

export interface ComponentOptions extends BaseOptions {
  name: string;
  subdir?: string;
  type?: 'query' | 'mutation' | 'subscription';
}

const ERR_BAD_CE_TAG_NAME = 'Custom element tag names must contain a hyphen (-)';

async function promptApp(options: PromptOptions<AppOptions>): Promise<AppOptions> {
  return {
    ...options,
    ...await prompts([{
      type: () => options?.uri == null ? 'text' : null,
      name: 'uri',
      message: 'What is the URI to your GraphQL endpoint?',
      initial: options?.uri ?? 'https://api.spacex.land/graphql',
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

async function promptComponent(
  options?: PromptOptions<ComponentOptions>
): Promise<ComponentOptions> {
  return {
    ...options,
    ...await prompts([{
      type: () => options?.name == null ? 'text' : null,
      name: 'name',
      message: 'What is the component\'s tag name?',
      initial: options?.name ?? '',
      validate:
        name => name.includes('-') || ERR_BAD_CE_TAG_NAME,
    }, {
      type: () => options?.subdir == null ? 'text' : null,
      name: 'subdir',
      initial: options?.subdir ?? '',
      message: 'Sub directory. Leave blank to scaffold to src/components',
    }]),
  };
}

async function argPrompt() {
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
    .command<AppOptions>('app', 'Generate an Apollo Elements Skeleton App', yargs => void yargs
      .option('uri', {
        type: 'string',
        description: 'URI to your GraphQL endpoint',
      })
      .option('yes', {
        alias: 'y',
        type: 'boolean',
        description: 'Use default package.json fields (e.g. author, license)',
      })
      .option('install', {
        type: 'boolean',
        description: 'Automatically install dependencies',
      })
      .option('start', {
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
      .help())
    .option('type', {
      alias: 't',
      type: 'string',
      choices: ['query', 'mutation', 'subscription'],
      description: 'Element Type',
      default: 'query',
    })
    .help()
    .check(({ name }) => {
      if (typeof name === 'string' && !name.includes('-'))
        throw new Error(ERR_BAD_CE_TAG_NAME);
      else
        return true;
    });

  if (argv._.includes('app'))
    return await promptApp(argv).then(app);
  else if (argv._.includes('component'))
    return await promptComponent(argv as ComponentOptions).then(component);
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

    switch (generate) {
      case 'app': return await promptApp(argv).then(app);
      case 'component': return await promptComponent(argv as ComponentOptions).then(component);
    }
  }
}

async function main() {
  try {
    await argPrompt();
  } catch (e) {
    console.error(e);
  }
}
main();
