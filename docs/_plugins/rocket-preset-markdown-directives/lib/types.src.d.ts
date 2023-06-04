import { RocketCliConfig } from '@rocket/cli';
import { Node, Parent } from 'unist';

export interface TransformerOptions {
  node: Node;
  parent: Parent;
  page: Record<string, unknown>;
  rocketConfig: RocketCliConfig;
}

export interface TransformerResult {
  attributes?: Record<string, string>;
  tagName?: string;
  textContent?: string;
}

interface Page {
  date: Date;
  inputPath: string;
  fileSlug: string;
  filePathStem: string;
  url: boolean|string;
  outputPath: boolean|string;
  [index: string]: unknown;
}

export interface Options {
  page: Page;
  rocketConfig: RocketCliConfig;
  config: Config;
}

export type Config =
  Record<string, (args: string[], opts: TransformerOptions) => TransformerResult>;
