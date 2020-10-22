export interface BaseOptions {
  pkgManager: 'npm' | 'yarn';
  schemaPath?: string;
  skipCodegen?: boolean;
  yes: boolean;
}

export interface AppOptions extends BaseOptions {
  install: boolean;
  start: boolean;
  uri: string;
}

export type Operation = 'query' | 'mutation' | 'subscription';

export interface ComponentOptions extends BaseOptions {
  name: string;
  subdir?: string;
  type?: Operation;
  sharedCssPath?: string;
  fields?: string;
  variables?: string;
}
